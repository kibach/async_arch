import { Logger, LoggerService } from "@nestjs/common";
import { Command, CommandRunner, Option } from "nest-commander";
import { KafkaService } from "src/kafka/kafka.service";
import { UserRepositoryService } from "src/user/user.repository";
import { UserMessageProcessorService } from "./user-message.service";
import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";

@Command({ name: 'consumer', description: 'Kafka event log consumer' })
export class ConsumerCommand extends CommandRunner {
    private readonly logger: Logger;

    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly kafkaService: KafkaService,
        private readonly userMessageProcessorService: UserMessageProcessorService,
    ) {
        super();
        this.logger = new Logger(ConsumerCommand.name);
    }

    async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
        this.logger.log('Connecting to database');

        // idk why this doenst happen automatically in CLI command context :/
        // await this.entityManager.connection.initialize();

        this.logger.log('Starting Kafka consumer');
        
        const consumer = await this.kafkaService.getConsumer();

        await consumer.subscribe({ topics: ['nrhskwij-streaming.users'], fromBeginning: true });

        this.logger.log('Subscribe success, starting message process loop');        

        consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }): Promise<void> => {
                const messageData = JSON.parse(message.value.toString());
                this.logger.log(`KAFKA: ${topic}, ${JSON.stringify(messageData)}`);

                if (messageData.type === 'user.created') {
                    const messageBody = messageData.data !== undefined ? messageData.data : messageData;

                    await this.userMessageProcessorService.handleUserCreated(messageBody);
                }
            },
        });

        if (options?.beginning === true) {
            this.logger.log('Seeking to the beginning of the topic')
            consumer.seek({ topic: 'nrhskwij-streaming.users', partition: 0, offset: '0' });
        }
    }

    @Option({
        flags: '-b, --beginning [boolean]',
        description: 'Start processing messages from the beginning',
    })
    parseBoolean(val: string): boolean {
        return JSON.parse(val);
    }
}
