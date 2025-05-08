import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { ConfigModule } from './common/config/config.module';
import { LoggerModule } from './common/logger/logger.module';
import { GlobalExceptionModule } from './common/filters/global-exception.module';
import { CacheModule } from './common/cache/cache.module';
import { MailModule } from './common/mail/mail.module';
import { TypeormModule } from './database/typeorm/typeorm.module';
import { ValidatorModule } from './common/validator/validator.module';
import { AuthModule } from './common/auth/auth.module';
import { NormalizeModule } from './common/normalize/normalize.module';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    LoggerModule,
    GlobalExceptionModule,
    CacheModule,
    MailModule,
    TypeormModule,
    ValidatorModule,
    AuthModule,
    NormalizeModule,
  ],
  controllers: [AppController],
  // providers 告诉nest->把下面的class类放到你的DI中进行初始化
  providers: [AppService],
  // exports 告诉nest ->下面的这个class我需要在其他地方用
  exports: [],
})
export class AppModule {}
