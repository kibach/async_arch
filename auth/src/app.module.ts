import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { OauthModule } from './oauth/oauth.module';
import { User } from './user/entities/User';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService): TypeOrmModuleOptions => {
        return {
          type: 'mysql',
          host: config.get<string>('DB_HOST'),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_DATABASE'),
          entities: [User],
          entitySkipConstructor: true,
        };
      },
      inject: [ConfigService],
    }),
    OauthModule,
    KafkaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
