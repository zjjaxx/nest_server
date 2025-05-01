import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Controller('user')
export class UserController {
  constructor(private configService: ConfigService) {
    this.configService = configService;
    console.log(this.configService.get('ENV'), this.configService.get('PORT'));
  }
}
