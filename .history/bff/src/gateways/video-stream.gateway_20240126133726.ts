import { Logger } from '@nestjs/common/services/logger.service';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ProducerService } from 'src/kafka/producer.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class VideoStreamGateway {
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(private readonly kafkaProducerService: ProducerService) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('offer')
  async handleStream(@MessageBody() data: string): Promise<void> {
    // Broadcast the stream to all clients except the sender
    this.logger.log(data, 'Log data');
    // client.broadcast.emit('stream', payload);

    await this.kafkaProducerService.produce({
      topic: 'video-stream',
      messages: [{ value: data }],
    });
  }

  @SubscribeMessage('answer')
  handleAnswer(@MessageBody() payload: any): void {
    // Broadcast the answer to other clients
    console.log('answer', payload);
    this.kafkaProducerService.produce({
      topic: 'video-stream',
      messages: payload,
    });
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(@MessageBody(), payload: any): void {
    // Broadcast the ICE candidate to other clients
    console.log('ice-candidate', payload);
    this.kafkaProducerService.produce({
      topic: 'video-stream',
      messages: payload,
    });
  }
}