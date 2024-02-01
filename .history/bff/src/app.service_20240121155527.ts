import { Injectable } from '@nestjs/common';
import { ProducerService } from './kkafka'; // Import the missing ProducerService class

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) {} // Fix the typo in the constructor parameter name
  async getHello() {
    // Sending message by creating topic with message
    await this.producerService.produce({
      topic: 'test',
      messages: [
        {
          value: 'Hello world',
        },
      ],
    });

    return 'Hello World!';
  }
}
