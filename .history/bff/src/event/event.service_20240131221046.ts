import { Injectable, Logger } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ConsumerService } from 'kafka/consumer.service';

@Injectable()
export class EventService {
  private logger: Logger = new Logger(EventService.name);

  constructor(
    private readonly consumerService: ConsumerService,
  ) {}

  create(createEventDto: CreateEventDto) {
    return 'This action adds a new event';
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
