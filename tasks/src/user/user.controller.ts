import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { OAuthAuthGuard } from './oauth.guard';

@Controller()
export class UserController {
    @UseGuards(OAuthAuthGuard)
    @Get()
    async index(
        @Res() res: Response,
    ): Promise<void> {
        res.send({ status: 'ok' });
    }

    @UseGuards(OAuthAuthGuard)
    @Get('user/callback')
    async callback(
        @Res() res: Response,
    ): Promise<void> {
        res.redirect('/');
    }
}
