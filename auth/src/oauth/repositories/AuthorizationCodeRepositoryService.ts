import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorizationCode } from "../entities/AuthorizationCode";
import { Repository } from "typeorm";
import { DateInterval, OAuthAuthCode, OAuthAuthCodeRepository, OAuthClient, OAuthScope, OAuthUser } from "@jmondi/oauth2-server";
import { Client } from "../entities/Client";
import { User } from "src/user/entities/User";
import { Scope } from "../entities/Scope";
import { randomUUID } from "crypto";

@Injectable()
export class AuthorizationCodeRepositoryService implements OAuthAuthCodeRepository {
    constructor(
        @InjectRepository(AuthorizationCode)
        private readonly repository: Repository<AuthorizationCode>,
    ) {}

    async getByIdentifier(authCodeCode: string): Promise<OAuthAuthCode> {
        return this.repository.findOneOrFail({
            where: {
                code: authCodeCode,
            },
        });
    }

    issueAuthCode(client: OAuthClient, user: OAuthUser | undefined, scopes: OAuthScope[]): OAuthAuthCode {
        const authCodeEntity = new AuthorizationCode({
            client: client as Client,
            user: user as User,
            scopes: scopes as Scope[],
            code: randomUUID(),
            codeChallenge: null,
            codeChallengeMethod: 'S256',
            redirectUri: null,
            expiresAt: new DateInterval("2h").getEndDate(),
        });

        return authCodeEntity;
    }

    async persist(authCode: OAuthAuthCode): Promise<void> {
        await this.repository.save(authCode as AuthorizationCode);
    }

    async isRevoked(authCodeCode: string): Promise<boolean> {
        const authCodeEntity = await this.getByIdentifier(authCodeCode) as AuthorizationCode;

        return authCodeEntity.isRevoked();
    }

    async revoke(authCodeCode: string): Promise<void> {
        const authCodeEntity = await this.getByIdentifier(authCodeCode) as AuthorizationCode;

        authCodeEntity.revoke();

        return this.persist(authCodeEntity);
    }
}
