import { Logger } from '@nestjs/common/services/logger.service';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ProducerService } from 'kafka/producer.service'; // Import the Kafka consumer service
import { Injectable } from '@nestjs/common';
@WebSocketGateway({ cors: { origin: '*' } })
@Injectable()
export class VideoStreamGateway {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger(VideoStreamGateway.name);

  constructor(private readonly kafkaProducerService: ProducerService) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('live-stream')
  async handleStream(@MessageBody() payload: any) {
    this.logger.log(payload);
    await this.kafkaProducerService.produce({
      topic: 'video-stream',
      messages: [{ value: JSON.stringify(payload) }],
    });
  }
}
