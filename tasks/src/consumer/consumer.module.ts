import { Module } from '@nestjs/common';
import { ConsumerCommand } from './consumer.command';
import { KafkaModule } from 'src/kafka/kafka.module';
import { UserModule } from 'src/user/user.module';
import { UserMessageProcessorService } from './user-message.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [KafkaModule, UserModule],
    providers: [ConsumerCommand, UserMessageProcessorService],
})
export class ConsumerModule {}
