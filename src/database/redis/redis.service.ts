import { Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis'
import { LoggerService } from 'src/utils/logger/logger.service';

@Injectable()
export class RedisService implements OnModuleInit {
    private className = 'RedisService'
    private redis : any
    constructor( private readonly loggerService : LoggerService){}

    onModuleInit() {
        this.initilizeRedisAdapter();
    }

    initilizeRedisAdapter(){
        const methodName = 'initilizeRedisAdapter';
        try{
            this.loggerService.log('Trying to create a redis connection', this.className, methodName)
            this.redis = new Redis();
            this.loggerService.log('Connection with redis is successfully created', this.className, methodName)
        }catch(error){
            this.loggerService.error(error, this.className, methodName)
            throw new Error(error.message)
        }
    }

    set(key : string, value : string){
        const methodName = 'set';
        this.loggerService.log('setting the value in redis', this.className, methodName);
        this.redis.set(key, value)
        return
    }

    expire(key, time: Number){
        const methodName = 'expire';
        this.loggerService.log('setting up the expiry time', this.className, methodName);
        this.redis.expire(key, time)
        return
    }

    get(key){
        const methodName = 'get';
        this.loggerService.log('Getting the value from redis', this.className, methodName);
        const result = this.redis.get(key);
        return result
    }
}
