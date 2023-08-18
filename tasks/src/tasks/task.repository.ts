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
}
