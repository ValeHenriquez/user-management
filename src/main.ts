import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/exception.filter';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = 80; // Puerto en el que se va a escuchar

  await app.listen(port);
  console.log(`Aplicación Nest.js corriendo en el puerto ${port}`);
}

bootstrap();
