import { Controller, Get, Post, Request, Response } from '@nestjs/common';
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

@Controller('oauth')
export class OauthController {
  constructor(private readonly oAuthService: OAuthService) {}

  @Get('authorize')
  async authorize(
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse,
  ): Promise<void> {
    try {
      const authRequest =
        await this.oAuthService.authorizationServer.validateAuthorizationRequest(
          req,
        );

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
