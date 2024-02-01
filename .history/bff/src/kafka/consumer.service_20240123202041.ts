import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  // Connect to Kafka Server
  private readonly kafka = new Kafka({
    brokers: ['kafka:9092'],
  });

  private readonly consumers: Consumer[] = [];

  constructor(private videoStreamGateway: EventsGateway) {}

  async consume(_topics: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    // We need to spcifiy the groupID while initializing the Kafka Consumer
    const consumer = this.kafka.consumer({ groupId: 'video-group' });

    // Connecting Consumer
    await consumer.connect();

    //Passing Topics to consumer
    await consumer.subscribe({ topic: 'video-stream', fromBeginning: true });

    //Setting  the Consumer Config
    await consumer.run({
      eachMessage: async ({ message }) => {
        // Assuming the message contains video data
        this.videoStreamGateway.sendStreamData(message.value);
      },
    });

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
