import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { VideoStreamGateway } from 'src/gateways/video-stream.gateway';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly videoStreamGateway: VideoStreamGateway,
  ) {}

  async onModuleInit() {
    // Consume Data with Spcific topic
    await this.consumerService.consume(
      { topics: ['video-stream'] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          });
        },
      },
    );
  }
}
