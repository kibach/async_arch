import { DataSource } from 'typeorm';
import { User } from './user/entities/User';
import { AuthorizationCode } from './oauth/entities/AuthorizationCode';
import { Client } from './oauth/entities/Client';
import { Scope } from './oauth/entities/Scope';
import { Token } from './oauth/entities/Token';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'welpassZX',
  database: 'popug_auth',
  logging: true,
  entities: [User, AuthorizationCode, Client, Scope, Token],
  entitySkipConstructor: true,
  subscribers: [],
  migrations: ['migrations/*.ts'],
});
