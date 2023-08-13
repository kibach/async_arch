import { randomBytes } from "crypto";
import { randomUUID } from "crypto";
import { Column, Entity, PrimaryColumn } from "typeorm";

type CreateArgs = {
    title: string;
    description: string;
    assignee: null;
    assignationFee: number;
    completionReward: number;

    id?: string;
    publicId?: string;
};

@Entity()
export class Task {
    @PrimaryColumn('char', { length: 36 })
    id: string;

    @Column('char', { length: 36 })
    publicId: string;

    @Column()
    title: string;

    @Column('text')
    description: string;
    
    assignee: null; // User

    @Column('float')
    assignationFee: number;

    @Column('float')
    completionReward: number;

    @Column()
    isCompleted: boolean;

    constructor(args: CreateArgs) {
        const {
            title,
            description,
            assignee,
            assignationFee,
            completionReward,

            id = randomUUID(),
            publicId = 'POPUG-' + randomBytes(6).toString('hex'),
        } = args;

        this.title = title;
        this.description = description;
        this.assignee = assignee;
        this.assignationFee = assignationFee;
        this.completionReward = completionReward;
        this.isCompleted = false;

        this.id = id;
        this.publicId = publicId;
    }
}
