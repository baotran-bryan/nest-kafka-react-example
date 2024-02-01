import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';
// import { VideoStreamGateway } from 'src/gateways/video-stream.gateway';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  // Connect to Kafka Server
  private readonly consumers: Consumer[] = [];
  private readonly kafka: Kafka;
  private readonly logger = new Logger(ConsumerService.name);

  constructor(private configService: ConfigService) {
    this.kafka = new Kafka({
      brokers: [
        `${this.configService.get('KAFKA_HOST')}:${this.configService.get('KAFKA_PORT')}`,
      ],
    });
  }

  // constructor(private videoStreamGateway: VideoStreamGateway) {}

  async consume(topics: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    // We need to spcifiy the groupID while initializing the Kafka Consumer
    const consumer = this.kafka.consumer({ groupId: 'video-stream' });

    // Connecting Consumer
    await consumer.connect();

    //Passing Topics to consumer
    await consumer.subscribe(topics);

    //Setting  the Consumer Config
    await consumer.run(config);

    //Gathering all the Consumers
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    // Disconnect all the consumer on Apllication shutdown
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
