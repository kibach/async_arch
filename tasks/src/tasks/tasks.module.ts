import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskRepositoryService } from './task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/Task';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
  ],
  providers: [TasksService, TaskRepositoryService],
  controllers: [TasksController]
})
export class TasksModule {}
