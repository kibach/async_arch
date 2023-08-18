import { Entity, Column, PrimaryColumn } from 'typeorm';
import { randomUUID } from 'crypto';

type CreateArgs = {
  email: string;
  name: string;
  role: string;
  publicId: string;

  id?: string;
};

@Entity()
export class User {
  @PrimaryColumn('char', { length: 36 })
  id: string;

  @Column('char', { length: 36 })
  publicId: string;

  @Column('varchar', { length: 50 })
  email: string;

  @Column()
  name: string;

  @Column()
  role: string;

  constructor(args: CreateArgs) {
    const {
      email,
      name,
      role,
      publicId,
      id = randomUUID(),
    } = args;

    this.id = id;
    this.publicId = publicId;
    this.email = email;
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
