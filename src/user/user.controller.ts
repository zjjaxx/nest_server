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

@Controller('user')
export class UserController {
  constructor(
    private configService: ConfigService,
    private logger: Logger,
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
}
