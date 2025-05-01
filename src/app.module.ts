import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
const envFilePath = [`.env.${process.env.NODE_ENV ?? 'development'}`, '.env'];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath,
    }),
    UserModule,
  ],
  controllers: [AppController],
  // providers 告诉nest->把下面的class类放到你的DI中进行初始化
  providers: [AppService],
  // exports 告诉nest ->下面的这个class我需要在其他地方用
  exports: [],
})
export class AppModule {}
