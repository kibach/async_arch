import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/Task"
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskRepositoryService {
    constructor(
        @InjectRepository(Task)
        private readonly repository: Repository<Task>,
    ) {}

    async getManyByAssignee(userId: string): Promise<Task[]> {
        return this.repository.find({
            where: {
                assignee: {
                    id: userId,
                },
            },
        });
    }

    async persist(task: Task): Promise<void> {
        await this.repository.save(task);
    }

    async getOneById(taskId: string): Promise<Task> {
        return this.repository.findOne({
            where: {
                id: taskId,
            },
        });
    }

    async getManyNotCompleted(): Promise<Task[]> {
        return this.repository.find({
            where: {
                isCompleted: false,
            },
        });
    }
}
