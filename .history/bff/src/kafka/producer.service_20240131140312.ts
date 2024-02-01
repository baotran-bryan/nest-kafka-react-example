import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  // Connect to Kafka Server
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly logger: Logger;
  
  constructor(private configService: ConfigService) {
    this.kafka = new Kafka({
      brokers: [`${this.configService.get('KAFKA')}`],
    });
    this.producer = this.kafka.producer();
    this.logger = new Logger(topic);
  }

  async onModuleInit() {
    // Connect Producer on Module initialization
    await this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    //Send Records to Kafka to producer
    this.producer.send(record);
  }

  async onApplicationShutdown() {
    //Disconnect producer on Application ShutDown
    await this.producer.disconnect();
  }
}