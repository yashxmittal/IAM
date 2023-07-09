import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/api/user/user.service';
import { LoggerService } from 'src/utils/logger/logger.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { RedisService } from 'src/database/redis/redis.service';

@Injectable()
export class AuthService {
    private className = 'AuthService';
    constructor ( private readonly loggerService: LoggerService,
                  private readonly userService : UserService,
                  private readonly jwtService: JwtService,
                  private readonly redisService : RedisService
        ) {}

        async signIn(emailId, otp){
            const methodName = 'signIn';
            try{
                this.loggerService.log('Inside SignIN function', this.className, methodName);
                const user = await this.userService.getUser(emailId, true);
                if(!user) throw new BadRequestException();
                const isMatch = await bcrypt.compare(otp, user?.password);
                if (!isMatch) {
                    this.loggerService.log(`Entered invalid password`, this.className, methodName);
                    throw new UnauthorizedException();
                }else{
                    this.loggerService.log('User authorized', this.className, methodName);
                    const payload = { id: user._id};
                    const dataToStore =await this.jwtService.signAsync(payload,{ expiresIn: process.env.JWT_EXPIRES_IN })
                    const random = randomUUID()
                    this.redisService.set(random, dataToStore)
                    this.redisService.expire(random, Number(process.env.ACCESS_TOKEN_EXPIRY))
                    return {access_token : random};
                }
            }catch(error){
                this.loggerService.error(error, this.className, methodName);
                throw {"statusCode" : 500 , "message" : error }
            }
        };
}
