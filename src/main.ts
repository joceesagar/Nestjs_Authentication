import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //will automatically remove extra field in the user input json (will not throw error)
    forbidNonWhitelisted: true //will throw and error if there is an extra field
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
