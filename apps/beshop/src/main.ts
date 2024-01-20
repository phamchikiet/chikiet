import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import bodyParser = require("body-parser");
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3200;
  app.enableCors();
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  await app.listen(port);
}
bootstrap();

