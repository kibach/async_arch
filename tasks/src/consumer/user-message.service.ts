import { Injectable } from "@nestjs/common";
import { User } from "src/user/entities/User";
import { UserRepositoryService } from "src/user/user.repository";

@Injectable()
export class UserMessageProcessorService {
    constructor(
        private readonly userRepositoryService: UserRepositoryService,
    ) {}

    async handleUserCreated(messageData: Record<string, string>): Promise<void> {
        const publicId = messageData?.publicId ?? '';

        let userEntity = await this.userRepositoryService.getOneByPublicId(publicId);

        if (userEntity === null) {
            userEntity = new User({
                email: messageData?.email ?? '',
                name: messageData?.name ?? '',
                role: messageData?.role ?? '',
                publicId: messageData?.publicId ?? '',
            });
        }

        await this.userRepositoryService.persist(userEntity);
    }
}
