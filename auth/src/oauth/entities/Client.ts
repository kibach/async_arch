import {
  GrantIdentifier,
  OAuthClient,
  OAuthScope,
} from '@jmondi/oauth2-server';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Scope } from './Scope';
import { randomUUID } from 'crypto';

type CreateArgs = {
  name: string;
  secret: string | null;
  redirectUris: string[];
  allowedGrants: GrantIdentifier[];
  scopes: OAuthScope[];

  id?: string;
};

@Entity()
export class Client implements OAuthClient {
  @PrimaryColumn('char', { length: 36 })
  id: string;

  @Column()
  name: string;

  @Column('varchar', { nullable: true })
  secret: string | null;

  @Column('simple-array')
  redirectUris: string[];

  @Column('simple-array')
  allowedGrants: GrantIdentifier[];

  @ManyToMany(() => Scope)
  @JoinTable()
  scopes: OAuthScope[];

  constructor(args: CreateArgs) {
    const {
      name,
      secret,
      redirectUris,
      allowedGrants,
      scopes,
      id = randomUUID(),
    } = args;

    this.name = name;
    this.secret = secret;
    this.redirectUris = redirectUris;
    this.allowedGrants = allowedGrants;
    this.scopes = scopes;
  }
}
