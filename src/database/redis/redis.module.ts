import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { LoggerService } from 'src/utils/logger/logger.service';

@Module({
  providers: [RedisService,LoggerService]
})
export class RedisModule {}
