import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './database/redis/redis.module';
import { LoggerModule } from './utils/logger/logger.module';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
    RedisModule,
    LoggerModule,
    AuthModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
