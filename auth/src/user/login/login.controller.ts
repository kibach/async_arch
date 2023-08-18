import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  Session,
} from '@nestjs/common';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { UserRepositoryService } from 'src/oauth/repositories/UserRepositoryService';

@Controller('login')
export class LoginController {
  constructor(private readonly userRepository: UserRepositoryService) {}

  @Get()
  async index(
    @Session() session: Record<string, any>,
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse,
  ): Promise<void> {
    const redirectTo = req.query['redirectTo']?.toString() ?? '/';

    if (session.user === undefined) {
      return res.render('login', { redirectTo });
    }

    return res.redirect(redirectTo);
  }

  @Post('login')
  async login(
    @Session() session: Record<string, any>,
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse,
  ): Promise<void> {
    const redirectTo = req.body['redirectTo'] ?? '/';
    const userEntity = await this.userRepository.getOneByEmail(
      req.body['email'],
    );

    if (userEntity === null) {
      return res.redirect(`/login?redirectTo=${redirectTo}`);
    }

    if (userEntity.passwordHash === req.body['password']) {
      session.user = { id: userEntity.id };

      return res.redirect(redirectTo);
    }

    return res.redirect(`/login?redirectTo=${redirectTo}`);
  }

  @Get('logout')
  async logout(
    @Session() session: Record<string, any>,
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse,
  ): Promise<void> {
    session.user = undefined;

    return res.redirect('/login');
  }
}
