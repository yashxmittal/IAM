import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoggerService } from 'src/utils/logger/logger.service';
import { JwtModule } from '@nestjs/jwt';
import { RedisService } from 'src/database/redis/redis.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [JwtModule.registerAsync({
    useFactory: async () => ({
      secret: process.env.SECRET
    })
  }),
  UserModule
],
  providers: [AuthService, LoggerService, RedisService],
  controllers: [AuthController],
  exports : [AuthService]
})
export class AuthModule {}
