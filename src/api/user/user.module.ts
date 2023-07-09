import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongoService } from 'src/database/mongo/mongo.service';
import { LoggerService } from 'src/utils/logger/logger.service';
import { RedisService } from 'src/database/redis/redis.service';
import { User, UserSchema } from 'src/database/schema/user.schema';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
    useFactory: async () => ({
      secret: process.env.SECRET
    })
  })],
  providers: [UserService, MongoService, LoggerService, RedisService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
