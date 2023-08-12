import { CodeChallengeMethod, OAuthAuthCode, OAuthClient } from "@jmondi/oauth2-server";
import { User } from "src/user/entities/User";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Scope } from "./Scope";
import { Client } from "./Client";
import { randomUUID } from "crypto";

type CreateArgs = {
    code: string;
    redirectUri: string | null;
    codeChallenge: string | null;
    codeChallengeMethod: CodeChallengeMethod | null;
    expiresAt: Date;
    user: User | null;
    client: Client;
    scopes: Scope[];
    id?: string;
};

@Entity()
export class AuthorizationCode implements OAuthAuthCode {
    @PrimaryColumn()
    id: string;

    @Column()
    code: string;

    @Column('varchar', { nullable: true })
    redirectUri: string | null;

    @Column('varchar', { nullable: true })
    codeChallenge: string | null;

    @Column('varchar', { nullable: true })
    codeChallengeMethod: CodeChallengeMethod | null;

    @Column('datetime', { precision: 3 })
    expiresAt: Date;

    @ManyToOne(() => User, { nullable: true })
    user: User | null;

    @ManyToOne(() => Client)
    client: Client;

    @ManyToMany(() => Scope)
    scopes: Scope[];

    constructor(args: CreateArgs) {
        const {
            code,
            redirectUri,
            codeChallenge,
            codeChallengeMethod,
            expiresAt,
            user,
            client,
            scopes,
            id = randomUUID(),
        } = args;

        this.code = code;
        this.redirectUri = redirectUri;
        this.codeChallenge = codeChallenge;
        this.codeChallengeMethod = codeChallengeMethod;
        this.expiresAt = expiresAt;
        this.user = user;
        this.client = client;
        this.scopes = scopes;
        this.id = id;
    }

    revoke(): void {
        this.expiresAt = new Date(0);
    }

    isRevoked(): boolean {
        return this.expiresAt.getTime() === 0;
    }
}
