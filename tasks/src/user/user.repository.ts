import { Injectable } from "@nestjs/common";
import { User } from "./entities/User";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepositoryService {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {}

    async getOneByPublicId(publicId: string): Promise<User | null> {
        return this.repository.findOne({
            where: {
                publicId,
            },
        });
    }
}
