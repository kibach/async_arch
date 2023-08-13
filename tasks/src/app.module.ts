import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { KafkaModule } from './kafka/kafka.module';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/User';
import { Task } from './tasks/entities/Task';
import { ConsumerModule } from './consumer/consumer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService): TypeOrmModuleOptions => {
        return {
          type: 'mysql',
          host: config.get<string>('DB_HOST'),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_DATABASE'),
          entities: [User, Task],
          entitySkipConstructor: true,
        };
      },
      inject: [ConfigService],
    }),
    KafkaModule,
    TasksModule,
    UserModule,
    ConsumerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
