import { Logger } from '@nestjs/common/services/logger.service';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ProducerService } from 'src/kafka/producer.service';

@WebSocketGateway()
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

  @SubscribeMessage('stream')
  async handleStream(@MessageBody() data: string): Promise<void> {
    // Broadcast the stream to all clients except the sender
    console.log(data);
    // client.broadcast.emit('stream', payload);
    await this.kafkaProducerService.produce(
      { topics: ['video-stream'] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          });
          // this.videoStreamGateway.sendStreamData({
          //   value: message.value.toString(),
          //   topic: topic.toString(),
          //   partition: partition.toString(),
          // });
        },
      },
    );
  }
}
