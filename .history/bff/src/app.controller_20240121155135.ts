import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('stream.get.video');
    await this.client.connect();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
