import { CommandFactory } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConsumerModule } from './consumer/consumer.module';

async function bootstrap() {
    await CommandFactory.run(AppModule, new Logger());
}

bootstrap();