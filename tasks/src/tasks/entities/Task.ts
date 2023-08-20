import { randomUUID } from "crypto";
import { User } from "src/user/entities/User";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

type CreateArgs = {
    title: string;
    description: string;
    assignee: User;
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
    
    @ManyToOne(() => User, { lazy: true })
    assignee: User | Promise<User>;

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
            publicId = randomUUID(),
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

    complete(): void {
        this.isCompleted = true;
    }

    setAssignee(assignee: User): void {
        this.assignee = assignee;
    }
}
