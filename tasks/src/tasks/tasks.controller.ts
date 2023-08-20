import { Controller, Get, Post, Req, Res, Session } from '@nestjs/common';
import { Request, Response } from 'express';
import { TaskRepositoryService } from './task.repository';
import { Task } from './entities/Task';
import { User } from 'src/user/entities/User';
import { UserRepositoryService } from 'src/user/user.repository';
import { KafkaService } from 'src/kafka/kafka.service';

function getRandomFloat(min: number, max: number, decimals: number): number {
    const str = (Math.random() * (max - min) + min).toFixed(
        decimals,
    );

    return parseFloat(str);
}

function shuffle<T>(array: Array<T>): Array<T> {
    let currentIndex = array.length;
    let randomIndex = 0;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly taskRepository: TaskRepositoryService,
        private readonly userRepository: UserRepositoryService,
        private readonly kafka: KafkaService,
    ) { }

    @Get()
    async index(
        @Session() session: Record<string, any>,
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<void> {
        if (session.user === undefined) {
            return res.redirect('/user');
        }

        const tasks = await this.taskRepository.getManyByAssignee(session.user.id);

        res.render('tasks/index', {
            tasks,
            user: session.user,
        });
    }

    @Get('/add')
    async add(
        @Session() session: Record<string, any>,
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<void> {
        if (session.user === undefined) {
            return res.redirect('/user');
        }

        return res.render('tasks/add', {
            user: session.user,
        });
    }

    @Post('/create')
    async create(
        @Session() session: Record<string, any>,
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<void> {
        if (session.user === undefined) {
            return res.redirect('/user');
        }

        const assignationFee = getRandomFloat(10, 20, 4);
        const completionReward = getRandomFloat(20, 40, 4);
        
        const workers = await this.userRepository.getManyWithRole('worker');
        shuffle(workers);

        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            assignee: workers[0],
            assignationFee,
            completionReward,
        });

        await this.taskRepository.persist(task);

        const producer = await this.kafka.getProducer();

        await producer.send({
            topic: 'nrhskwij-streaming.tasks',
            messages: [
                {
                    key: task.publicId,
                    value: JSON.stringify({
                        publicId: task.publicId,
                        title: task.title,
                        description: task.description,
                        assigneePublicId: (await task.assignee).publicId,
                        assignationFee: task.assignationFee,
                        completionReward: task.completionReward,
                    }),
                },
            ],
        });

        return res.redirect('/tasks');
    }

    @Get('/complete/:id')
    async complete(
        @Session() session: Record<string, any>,
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<void> {
        if (session.user === undefined) {
            return res.redirect('/user');
        }

        const task = await this.taskRepository.getOneById(req.params.id);

        task.complete();

        await this.taskRepository.persist(task);

        const producer = await this.kafka.getProducer();

        await producer.send({
            topic: 'nrhskwij-tasks',
            messages: [
                {
                    key: task.publicId,
                    value: JSON.stringify({
                        type: 'completed',
                        publicId: task.publicId,
                        assigneePublicId: (await task.assignee).publicId,
                    }),
                },
            ],
        });

        return res.redirect('/tasks');
    }

    @Get('/reassign')
    async reassign(
        @Session() session: Record<string, any>,
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<void> {
        if (session.user === undefined) {
            return res.redirect('/user');
        }

        const workers = await this.userRepository.getManyWithRole('worker');
        shuffle(workers);

        const tasksToReassign = await this.taskRepository.getManyNotCompleted();
        const producer = await this.kafka.getProducer();

        for (const task of tasksToReassign) {
            //Random assignee
            const assignee = workers[Math.floor(Math.random() * workers.length)];

            task.setAssignee(assignee);

            await this.taskRepository.persist(task);
        
            await producer.send({
                topic: 'nrhskwij-tasks',
                messages: [
                    {
                        key: task.publicId,
                        value: JSON.stringify({
                            type: 'assigned',
                            publicId: task.publicId,
                            assigneePublicId: assignee.publicId,
                        }),
                    },
                ],
            });
        }

        return res.redirect('/tasks');
    }
}
