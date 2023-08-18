import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService {
  private readonly kafka: Kafka;
  private _producer?: Producer;
  private _consumer?: Consumer;

  constructor(private readonly config: ConfigService) {
    this.kafka = new Kafka({
      clientId: 'nrhskwij-popug-tasks',
      brokers: [config.get<string>('KAFKA_HOST') ?? ''],
      ssl: true,
      sasl: {
        mechanism: 'scram-sha-512', // scram-sha-256 or scram-sha-512
        username: config.get<string>('KAFKA_USER') ?? '',
        password: config.get<string>('KAFKA_PASSWORD') ?? '',
      },
    });
  }

  async getProducer(): Promise<Producer> {
    if (this._producer !== undefined) {
      return this._producer;
    }

    this._producer = this.kafka.producer();

    await this._producer.connect();

    return this._producer;
  }

  async getConsumer(): Promise<Consumer> {
    if (this._consumer !== undefined) {
      return this._consumer;
    }

    this._consumer = this.kafka.consumer({ groupId: 'nrhskwij-popug-tasks' });

    await this._consumer.connect();

    return this._consumer;
  }
}
