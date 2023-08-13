import { Injectable } from '@nestjs/common';
import { ClientRepositoryService } from '../repositories/ClientRepositoryService';
import { TokenRepositoryService } from '../repositories/TokenRepositoryService';
import { ScopeRepositoryService } from '../repositories/ScopeRepositoryService';
import {
  AuthorizationServer,
  DateInterval,
  JwtService,
} from '@jmondi/oauth2-server';
import { AuthorizationCodeRepositoryService } from '../repositories/AuthorizationCodeRepositoryService';
import { UserRepositoryService } from '../repositories/UserRepositoryService';
import { CustomJWTService } from './jwt.service';

@Injectable()
export class OAuthService {
  readonly authorizationServer: AuthorizationServer;

  constructor(
    private readonly clientRepository: ClientRepositoryService,
    private readonly tokenRepository: TokenRepositoryService,
    private readonly scopeRepository: ScopeRepositoryService,
    private readonly authCodeRepository: AuthorizationCodeRepositoryService,
    private readonly userRepository: UserRepositoryService,
  ) {
    this.authorizationServer = new AuthorizationServer(
      clientRepository,
      tokenRepository,
      scopeRepository,
      new CustomJWTService('test'),
      { requiresPKCE: false },
    );
    this.authorizationServer.enableGrantTypes(
      ['client_credentials', new DateInterval('1d')],
      ['refresh_token', new DateInterval('30d')],
      { grant: 'authorization_code', authCodeRepository, userRepository },
    );
  }
}
