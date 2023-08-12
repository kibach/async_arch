import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "../entities/Client";
import { Repository } from "typeorm";
import { GrantIdentifier, OAuthClient, OAuthClientRepository } from "@jmondi/oauth2-server";

@Injectable()
export class ClientRepositoryService implements OAuthClientRepository {
    constructor(
        @InjectRepository(Client)
        private readonly repository: Repository<Client>,
    ) {}

    async getByIdentifier(clientId: string): Promise<OAuthClient> {
        return this.repository.findOneOrFail({
            where: {
                id: clientId,
            },
        })
    }

    async isClientValid(grantType: GrantIdentifier, client: OAuthClient, clientSecret?: string | undefined): Promise<boolean> {
        if (client.secret && client.secret !== clientSecret) {
            return false;
        }

        return client.allowedGrants.includes(grantType);
    }
}
