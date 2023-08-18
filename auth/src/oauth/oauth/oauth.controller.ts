import { Controller, Get, Post, Request, Response, Session } from '@nestjs/common';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { OAuthService } from './oauth.service';
import {
  requestFromExpress,
  handleExpressResponse,
  handleExpressError,
} from '@jmondi/oauth2-server/express';
import { UserRepositoryService } from '../repositories/UserRepositoryService';

@Controller('oauth')
export class OauthController {
  constructor(
    private readonly oAuthService: OAuthService,
    private readonly userRepository: UserRepositoryService,
  ) {}

  @Get('authorize')
  async authorize(
    @Session() session: Record<string, any>,
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse,
  ): Promise<void> {
    try {
      if (session.user === undefined) {
        return res.redirect('/login?redirectTo=' + encodeURIComponent(req.url));
      }
  
      const userId = session.user.id ?? '';
      const userEntity = await this.userRepository.getOneById(userId);
  
      if (userEntity === null) {
        return res.redirect('/login/logout');
      }

      const authRequest =
        await this.oAuthService.authorizationServer.validateAuthorizationRequest(
          req,
        );

      authRequest.user = userEntity;
      authRequest.isAuthorizationApproved = true;

      const oAuthResponse =
        await this.oAuthService.authorizationServer.completeAuthorizationRequest(
          authRequest,
        );

      return handleExpressResponse(res, oAuthResponse);
    } catch (error) {
      return handleExpressError(error, res);
    }
  }

  @Post('token')
  async token(
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse,
  ): Promise<void> {
    try {
      const oAuthResponse =
        await this.oAuthService.authorizationServer.respondToAccessTokenRequest(
          req,
        );

      return handleExpressResponse(res, oAuthResponse);
    } catch (error) {
      return handleExpressError(error, res);
    }
  }
}
