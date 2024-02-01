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
import { ConsumerService } from 'kafka/consumer.service';
@WebSocketGateway({ cors: { origin: '*' } })
@Injectable()
export class VideoStreamGateway {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(
    private readonly consumerService: ConsumerService,
    private readonly kafkaProducerService: ProducerService,
  ) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  async onModuleInit() {
    // Consume Data with Spcific topic
    await this.consumerService.consume(
      { topics: ['video-stream'] },
      {
        eachMessage: async ({ message }) => {

          // Process or forward the message as needed
          console.log(message.value.toString());
          this.sendToAll(message.value.toString());
        },
      },
    );
  }

  @SubscribeMessage('live-stream')
  async handleStream(@MessageBody() payload: any) {
    await this.kafkaProducerService.produce({
      topic: 'video-stream',
      messages: [{ value: JSON.stringify(payload) }],
    });
  }

  sendToAll(data: string) {
    this.logger.log(data)
    // this.server.emit('event-data', data);
  }
}
