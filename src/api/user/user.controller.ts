import { Body, Controller, Get, Param, Post, Res, Req, UseGuards, Patch } from '@nestjs/common';
import { LoggerService } from 'src/utils/logger/logger.service';
import { UserService } from './user.service';
import { AuthGuard } from 'src/middleware/guards/auth/auth.guard';
import { CreateUserDto } from 'src/database/dto/createUser.sto';

@Controller('user')
export class UserController {
    private className = 'UserController'
    constructor( private readonly loggerService : LoggerService,
                 private readonly userService : UserService
        ) {}

        @Post('create')
        async create(@Body() createUserDto: CreateUserDto, @Res() res){
            const methodName = 'create';
            try{
                this.loggerService.log('Enter to Creating the profile of user', this.className, methodName);
                const result = await this.userService.create(createUserDto, res);
                return result
            }catch(error){
                this.loggerService.error(error, this.className, methodName);
                res.status(500).json(error);
            }
        };
    
        @Get()
        @UseGuards(AuthGuard)
        async fetchUser(@Res() res, @Req() req){
            const methodName = 'fetchUser'
            try{
                this.loggerService.log('Entering to get the details of user', this.className, methodName)
                const result = await this.userService.getUser(req.user.id, false);
                return res.status(200).json(result)
            }catch(error){
                this.loggerService.error(error, this.className, methodName);
                return res.status(500).json(error)
            }
        }
}