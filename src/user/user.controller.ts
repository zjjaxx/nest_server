import { Controller, Logger } from '@nestjs/common';
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
}
