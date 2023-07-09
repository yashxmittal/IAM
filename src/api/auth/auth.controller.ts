import { Body, Controller, Post, Res} from '@nestjs/common';
import { LoggerService } from 'src/utils/logger/logger.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    private className = 'AuthController';

    constructor( private readonly loggerService:LoggerService,
                 private readonly authService: AuthService
        ) {}

        @Post('login')
        async signIn(@Body() signInDto :Record<string, string>, @Res() res) {
            const methodName = 'signIn';
            try{
                this.loggerService.log('Trying to authorize the user', this.className, methodName);
                const result = await this.authService.signIn(signInDto.emailId, signInDto.password);
                this.loggerService.log('user is successfully authorized', this.className, methodName);
                return res.status(200).json(result)
            }catch(error){
                this.loggerService.error(error, this.className, methodName);
                return res.status(error.statusCode).json(error.message)
            }
        };
    
}
