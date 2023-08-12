import { Controller, Get, Session, Request, Response } from '@nestjs/common';
import { Response as ExpressResponse, Request as ExpressRequest } from 'express';
import { UserRepositoryService } from 'src/oauth/repositories/UserRepositoryService';

@Controller()
export class DashboardController {
    constructor(
        private readonly userRepository: UserRepositoryService,
    ) {}

    @Get()
    async index(
        @Session() session: Record<string, any>,
        @Request() req: ExpressRequest,
        @Response() res: ExpressResponse,
    ): Promise<void> {
        if (session.user === undefined) {
            return res.redirect('login');
        }

        const userId = session.user.id ?? '';
        const userEntity = await this.userRepository.getOneById(userId);

        if (userEntity === null) {
            return res.redirect('login/logout');
        }

        return res.render('dashboard', { user: userEntity });
    }
}
