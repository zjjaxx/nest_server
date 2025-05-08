import { MailerService } from '@nestjs-modules/mailer';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  Post,
  Logger,
  ParseIntPipe,
  Query,
  UseInterceptors,
  UseGuards,
  Request,
  ClassSerializerInterceptor,
  SerializeOptions,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { CreateUser, UserResponse } from './user.dto';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/auth/roles.guard';
import { RolePermissionKey } from '../common/auth/roles.type';
import {
  Permission,
  PermissionDelete,
  PermissionQuery,
} from '../common/auth/roles.decorator';
@Controller('user')
@Permission('user')
export class UserController {
  constructor(
    private configService: ConfigService,
    private logger: Logger,
    @Inject(RolePermissionKey) private userServce: UserService,
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

  @Post('create')
  async create(@Body() createUser: CreateUser) {
    return await this.userServce.create(createUser);
  }

  @Post('login')
  async login(@Body() loginUser: CreateUser) {
    return await this.userServce.login(loginUser);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get('profile')
  @PermissionDelete()
  getProfile(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return req.user;
  }

  @ApiBearerAuth()
  @PermissionQuery()
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: UserResponse })
  @UseGuards(AuthGuard, RolesGuard)
  @Get('info')
  getInfo(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return req.user;
  }
}
