import { Module } from '@nestjs/common';
import { OauthController } from './oauth/oauth.controller';
import { OAuthService } from './oauth/oauth.service';
import { AuthorizationCodeRepositoryService } from './repositories/AuthorizationCodeRepositoryService';
import { ClientRepositoryService } from './repositories/ClientRepositoryService';
import { ScopeRepositoryService } from './repositories/ScopeRepositoryService';
import { TokenRepositoryService } from './repositories/TokenRepositoryService';
import { UserRepositoryService } from './repositories/UserRepositoryService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizationCode } from './entities/AuthorizationCode';
import { Client } from './entities/Client';
import { Scope } from './entities/Scope';
import { Token } from './entities/Token';
import { User } from 'src/user/entities/User';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AuthorizationCode, Client, Scope, Token]),
  ],
  controllers: [OauthController],
  providers: [
    OAuthService,
    AuthorizationCodeRepositoryService,
    ClientRepositoryService,
    ScopeRepositoryService,
    TokenRepositoryService,
    UserRepositoryService,
  ],
})
export class OauthModule {}
