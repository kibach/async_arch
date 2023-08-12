import { OAuthClient, OAuthScope, OAuthToken, OAuthUser } from "@jmondi/oauth2-server/index";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Client } from "./Client";
import { User } from "src/user/entities/User";
import { Scope } from "./Scope";
import { randomUUID } from "crypto";

type CreateArgs = {
    accessToken: string;
    accessTokenExpiresAt: Date;
    refreshToken: string | null;
    refreshTokenExpiresAt: Date | null;
    client: Client;
    user: User | null;
    scopes: Scope[];
    originatingAuthCodeId?: string | undefined;
    
    id?: string;
};

@Entity()
export class Token implements OAuthToken {
    @PrimaryColumn('char', { length: 36 })
    id: string;

    @Column()
    accessToken: string;

    @Column('datetime', { precision: 3 })
    accessTokenExpiresAt: Date;

    @Column('varchar', { nullable: true })
    refreshToken: string | null;

    @Column('datetime', { precision: 3, nullable: true })
    refreshTokenExpiresAt: Date | null;

    @ManyToOne(() => Client)
    client: Client;

    @ManyToOne(() => User, { nullable: true })
    user: User | null;

    @ManyToMany(() => Scope)
    scopes: Scope[];

    @Column('varchar', { nullable: true })
    originatingAuthCodeId?: string | undefined;

    constructor(args: CreateArgs) {
        const {
            accessToken,
            accessTokenExpiresAt,
            refreshToken,
            refreshTokenExpiresAt,
            client,
            user,
            scopes,
            originatingAuthCodeId,
            id = randomUUID(),
        } = args;

        this.accessToken = accessToken;
        this.accessTokenExpiresAt = accessTokenExpiresAt;
        this.refreshToken = refreshToken;
        this.refreshTokenExpiresAt = refreshTokenExpiresAt;
        this.client = client;
        this.user = user;
        this.scopes = scopes;
        this.originatingAuthCodeId = originatingAuthCodeId;
        this.id = id;
    }

    revoke(): void {
        this.accessTokenExpiresAt = new Date(0);
    }

    isRevoked(): boolean {
        return this.accessTokenExpiresAt.getTime() === 0;
    }
}
