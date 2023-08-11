import { Entity, Column, PrimaryColumn } from "typeorm";
import { randomUUID } from "crypto";

type CreateArgs = {
    email: string;
    passwordHash: string;
    name: string;
    role: string;

    id?: string;
};

@Entity()
export class User {
    @PrimaryColumn('char', { length: 36 })
    readonly id: string;

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
            id = randomUUID(),
        } = args;

        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
        this.name = name;
    }
}
