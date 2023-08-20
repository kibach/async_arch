import { Controller, Get, Req, Res, Session, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { OAuthAuthGuard } from './oauth.guard';

@Controller()
export class UserController {
    @Get()
    async root(@Res() res: Response): Promise<void> {
        return res.redirect('/tasks');
    }

    @UseGuards(OAuthAuthGuard)
    @Get('user')
    async index(
        @Res() res: Response,
    ): Promise<void> {
        res.send({ status: 'ok' });
    }

    @UseGuards(OAuthAuthGuard)
    @Get('user/callback')
    async callback(
        @Session() session: Record<string, any>,
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<void> {
        session.user = req.user;

        res.redirect('/tasks');
    }
}
