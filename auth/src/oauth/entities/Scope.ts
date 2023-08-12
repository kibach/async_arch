import { OAuthScope } from "@jmondi/oauth2-server";
import { randomUUID } from "crypto";
import { Column, Entity, PrimaryColumn } from "typeorm";

type CreateArgs = {
    name: string;
    id?: string;
};

@Entity()
export class Scope implements OAuthScope {
    @PrimaryColumn('char', { length: 36 })
    id: string;

    @Column()
    name: string;

    constructor(args: CreateArgs) {
        const {
            name,
            id = randomUUID(),
        } = args;

        this.name = name;
        this.id = id;
    }
}
