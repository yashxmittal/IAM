import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe} from '@nestjs/common';
import { LoggerService } from './utils/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bufferLogs: true,
  });
  app.useLogger(app.get(LoggerService));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
