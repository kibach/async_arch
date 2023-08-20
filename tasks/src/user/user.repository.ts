import { Injectable } from "@nestjs/common";
import { User } from "./entities/User";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepositoryService {
    constructor(
        @InjectRepository(User)
        readonly repository: Repository<User>,
    ) {}

    async getOneByPublicId(publicId: string): Promise<User | null> {
        return this.repository.findOne({
            where: {
                publicId,
            },
        });
    }

    async persist(user: User): Promise<void> {
        await this.repository.save(user);
    }

    async getManyWithRole(role: string): Promise<User[]> {
        return this.repository.find({
            where: {
                role,
            },
        });
    }
}
