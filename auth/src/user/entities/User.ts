import { Entity, Column, PrimaryColumn } from "typeorm";
import { randomUUID } from "crypto";
import { OAuthUser } from "@jmondi/oauth2-server";

type CreateArgs = {
    email: string;
    passwordHash: string;
    name: string;
    role: string;

    publicId?: string;
    id?: string;
};

@Entity()
export class User implements OAuthUser {
    @PrimaryColumn('char', { length: 36 })
    readonly id: string;

    @Column('char', { length: 36 })
    readonly publicId: string;

    @Column('varchar', { length: 50 })
    readonly email: string;

    @Column()
    readonly passwordHash: string;

    @Column()
    name: string;

    @Column()
    role: string;

    constructor(args: CreateArgs) {
        const {
            email,
            passwordHash,
            name,
            role,
            publicId = randomUUID(),
            id = randomUUID(),
        } = args;

        this.id = id;
        this.publicId = publicId;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
        this.name = name;
    }

    toString(): string {
        return `id=${this.id}
publicId=${this.publicId}
email=${this.email}
name=${this.name}
role=${this.role}`;
    }
}
