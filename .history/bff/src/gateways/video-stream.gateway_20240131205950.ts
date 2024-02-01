import { Logger } from '@nestjs/common/services/logger.service';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ProducerService } from 'kafka/producer.service';
import { ConsumerService } from 'kafka/consumer.service'; // Import the Kafka consumer service
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class VideoStreamGateway {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(
    private readonly kafkaProducerService: ProducerService,
    private readonly kafkaConsumerService: ConsumerService, // Inject the Kafka consumer service
  ) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('live-stream')
  async handleStream(@MessageBody() data: any) {
    await this.kafkaProducerService.produce({
      topic: 'video-stream',
      messages: [{ value: data }],
    });
    return data;
  }
}