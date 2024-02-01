import { Injectable, Logger } from '@nestjs/common';
import { ConsumerService } from 'kafka/consumer.service';
import { StreamingEvent } from 'database/entities/streaming-events.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventService {
  private logger: Logger = new Logger(EventService.name);

  constructor(
    @InjectRepository(StreamingEvent)
    private streamingEventRepository: Repository<StreamingEvent>,
    private readonly consumerService: ConsumerService,
  ) {}

  async onModuleInit() {
    // Consume Data with Spcific topic
    await this.consumerService.consume(
      { topics: ['video-stream'] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          const content = message.value.toString();
          this.logger.log(partition);

          const newRecord = this.streamingEventRepository.create({
            message: content,
          });
          await this.streamingEventRepository.save(newRecord);

          console.log(`Saved message from Kafka to database: ${content}`);
        },
      },
    );
  }

  // create(createEventDto: CreateEventDto) {
  //   return 'This action adds a new event';
  // }

  // findAll() {
  //   return `This action returns all event`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} event`;
  // }

  // update(id: number, updateEventDto: UpdateEventDto) {
  //   return `This action updates a #${id} event`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} event`;
  // }
}
