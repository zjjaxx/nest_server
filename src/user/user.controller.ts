import { MailerService } from '@nestjs-modules/mailer';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Logger,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private configService: ConfigService,
    private logger: Logger,
    private userServce: UserService,
    private readonly mailerService: MailerService,
  ) {
    this.logger.log(
      this.configService.get('ENV') + ' ' + this.configService.get('PORT'),
    );
    this.logger.log({ say: 'haha' });
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(50 * 1000)
  @CacheKey('zjj_key')
  getUser(@Query('id', ParseIntPipe) id: number) {
    this.logger.log(`id is${id}`);
    return id;
  }

  @Get('send')
  async sendEmail() {
    await this.mailerService.sendMail({
      to: '2495893564@qq.com',
      from: '2495893564@qq.com',
      subject: 'Testing Nest Mailermodule with template ✔',
      template: 'index', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
      context: {
        name: 'zjj',
      },
    });
    return 'ok';
  }

  @Get('create')
  async create() {
    return await this.userServce.create();
  }
}
