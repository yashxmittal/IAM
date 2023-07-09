import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MongoService } from 'src/database/mongo/mongo.service';
import { RedisService } from 'src/database/redis/redis.service';
import { LoggerService } from 'src/utils/logger/logger.service';
import { User } from 'src/database/schema/user.schema';

@Injectable()
export class UserService {
        private className = 'UserService';

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly mongoService: MongoService,
        private readonly loggerService: LoggerService,
        private readonly redisService: RedisService,
        private readonly jwtService: JwtService
    ) { };

    async create(data, res) {
        const methodName = 'create';
        try {
            this.loggerService.log('Manupluating the data before sending it to db', this.className, methodName);
            let filter = {
                emailId: data.emailId
            };
            const value = await this.mongoService.findOne(this.userModel, filter);
            if (value) {
                this.loggerService.warn('user is  already present', this.className, methodName);
                return res.status(409).json({ message: "Duplicate record" });
            };
            const encryptedpassword = await bcrypt.hash(data.password, 10);
            data['password'] = encryptedpassword;
            const milliseconds = Date.now()
            const date = new Date(milliseconds);
            data['createdAt'] = date.toString();
            const createdAdmin = new this.userModel(data);
            const result = await this.mongoService.create(createdAdmin);
            this.loggerService.log('Successfully saved the data', this.className, methodName);
            return res.status(201).json(result)
        } catch (error) {
            this.loggerService.error(error, this.className, methodName)
            throw new Error(error)
        }
    };

    async getUser(data, auth) {
        const methodName = 'getUser';
        try {
            this.loggerService.log('Trying to fetch the details of a user', this.className, methodName)
            let filter 
            if(auth){
                filter = {
                    emailId: data
                }
            }else{
                filter = {
                    _id : data
                }
            }
            const result = await this.mongoService.findOne(this.userModel, filter);
            return result
        } catch (error) {
            this.loggerService.error(error, this.className, methodName);
            throw new Error(error)
        }
    }
}
