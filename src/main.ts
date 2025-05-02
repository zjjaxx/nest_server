import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { VersioningType } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configSevice = app.get(ConfigService);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.enableCors();
  app.setGlobalPrefix(configSevice.get<string>('API_PREFIX', 'api'));
  app.enableVersioning({
    prefix: configSevice.get<string>('API_VERSION_PREFIX', 'v'),
    type: VersioningType.URI,
    defaultVersion: configSevice.get<string>('API_VERSIONS', '1').split(','),
  });

  await app.listen(configSevice.get<string>('PORT', '3000'));
}
bootstrap();
