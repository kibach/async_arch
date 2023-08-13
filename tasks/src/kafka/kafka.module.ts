import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
