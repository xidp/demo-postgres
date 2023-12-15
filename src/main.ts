import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('api');

  // ATENTION: Helmet and Cors MUST came before any app.use(...)
  app.use(helmet());
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
