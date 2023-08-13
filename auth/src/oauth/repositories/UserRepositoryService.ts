import {
  GrantIdentifier,
  OAuthClient,
  OAuthUser,
  OAuthUserIdentifier,
  OAuthUserRepository,
} from '@jmondi/oauth2-server';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryService implements OAuthUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async getUserByCredentials(
    identifier: OAuthUserIdentifier,
    password?: string | undefined,
    grantType?: GrantIdentifier | undefined,
    client?: OAuthClient | undefined,
  ): Promise<OAuthUser | undefined> {
    const userEntity = await this.repository.findOne({
      where: {
        id: identifier.toString(),
      },
    });

    if (userEntity === null) {
      return undefined;
    }

    if (password !== undefined && userEntity.passwordHash !== password) {
      return undefined;
    }

    return userEntity;
  }

  async getOneById(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async getOneByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }

  async persist(user: User): Promise<void> {
    await this.repository.save(user);
  }
}
