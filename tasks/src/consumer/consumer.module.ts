import { Module } from '@nestjs/common';
import { ConsumerCommand } from './consumer.command';
import { KafkaModule } from 'src/kafka/kafka.module';
import { UserModule } from 'src/user/user.module';
import { UserMessageProcessorService } from './user-message.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/User';
import { UserRepositoryService } from 'src/user/user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), 
        KafkaModule, 
        // UserModule,
    ],
    providers: [
        ConsumerCommand, 
        UserMessageProcessorService,
        UserRepositoryService,
    ],
})
export class ConsumerModule {}
