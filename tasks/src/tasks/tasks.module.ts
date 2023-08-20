import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskRepositoryService } from './task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/Task';
import { User } from 'src/user/entities/User';
import { UserRepositoryService } from 'src/user/user.repository';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [
    KafkaModule,
    TypeOrmModule.forFeature([Task, User]),
  ],
  providers: [TasksService, TaskRepositoryService, UserRepositoryService],
  controllers: [TasksController]
})
export class TasksModule {}
