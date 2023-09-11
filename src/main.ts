import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3500);
  console.log("server is running at : http://localhost:3500/")
}
bootstrap();
