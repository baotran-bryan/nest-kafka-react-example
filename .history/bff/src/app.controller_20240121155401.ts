import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly client: ClientKafka,
  ) {}


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
