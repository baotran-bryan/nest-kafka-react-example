import { Logger } from '@nestjs/common/services/logger.service';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ProducerService } from 'src/kafka/producer.service';
import { ConsumerService } from 'src/kafka/consumer.service'; // Import the Kafka consumer service
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

  @SubscribeMessage('offer')
  async handleStream(@MessageBody() data: any): Promise<void> {
    // this.logger.log(data, 'Log Offer Data');

    await this.kafkaProducerService.produce({
      topic: 'video-stream',
      messages: [{ value: data }],
    });
    return data;
  }

  @SubscribeMessage('livestream')
  async handleIceCandidate(@MessageBody() payload: any) {
    // Consume data from Kafka and transmit it to the client
    // this.kafkaConsumerService.consume('video-stream', (message) => {
    //   this.server.emit('stream', message.value.toString());
    // });
    return await this.kafkaConsumerService.consume(
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
