import { Injectable } from '@nestjs/common';
import { Token } from '../entities/Token';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DateInterval,
  OAuthClient,
  OAuthScope,
  OAuthToken,
  OAuthTokenRepository,
  OAuthUser,
} from '@jmondi/oauth2-server';
import { randomUUID } from 'crypto';
import { Client } from '../entities/Client';
import { User } from 'src/user/entities/User';
import { Scope } from '../entities/Scope';

@Injectable()
export class TokenRepositoryService implements OAuthTokenRepository {
  constructor(
    @InjectRepository(Token)
    private readonly repository: Repository<Token>,
  ) {}

  async issueToken(
    client: OAuthClient,
    scopes: OAuthScope[],
    user?: OAuthUser | null | undefined,
  ): Promise<OAuthToken> {
    return new Token({
      accessToken: randomUUID(),
      accessTokenExpiresAt: new DateInterval('2h').getEndDate(),
      refreshToken: null,
      refreshTokenExpiresAt: null,
      client: client as Client,
      user: (user as User) ?? null,
      scopes: scopes as Scope[],
    });
  }

  async issueRefreshToken(
    accessToken: OAuthToken,
    client: OAuthClient,
  ): Promise<OAuthToken> {
    const tokenEntity = accessToken as Token;

    tokenEntity.refreshToken = randomUUID();
    tokenEntity.refreshTokenExpiresAt = new DateInterval('30d').getEndDate();

    await this.persist(tokenEntity);

    return tokenEntity;
  }

  async persist(accessToken: OAuthToken): Promise<void> {
    await this.repository.save(accessToken as Token);
  }

  async revoke(accessToken: OAuthToken): Promise<void> {
    (accessToken as Token).revoke();

    await this.persist(accessToken);
  }

  async isRefreshTokenRevoked(refreshToken: OAuthToken): Promise<boolean> {
    return (refreshToken as Token).isRevoked();
  }

  async getByRefreshToken(refreshTokenToken: string): Promise<OAuthToken> {
    return this.repository.findOneOrFail({
      where: {
        refreshToken: refreshTokenToken,
      },
    });
  }
}
