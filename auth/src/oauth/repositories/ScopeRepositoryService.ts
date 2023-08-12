import { GrantIdentifier, OAuthClient, OAuthScope, OAuthScopeRepository, OAuthUserIdentifier } from "@jmondi/oauth2-server";
import { Injectable } from "@nestjs/common";
import { Scope } from "../entities/Scope";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

@Injectable()
export class ScopeRepositoryService implements OAuthScopeRepository {
    constructor(
        @InjectRepository(Scope)
        private readonly repository: Repository<Scope>,
    ) {}

    async getAllByIdentifiers(scopeNames: string[]): Promise<OAuthScope[]> {
        return this.repository.find({
            where: {
                name: In(scopeNames),
            },
        });
    }

    async finalize(scopes: OAuthScope[], _identifier: GrantIdentifier, _client: OAuthClient, _user_id?: OAuthUserIdentifier | undefined): Promise<OAuthScope[]> {
        return scopes;
    }
}