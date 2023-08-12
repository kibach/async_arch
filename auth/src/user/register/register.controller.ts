import { Controller, Get, Post, Response, Session, Request } from '@nestjs/common';
import { Response as ExpressResponse, Request as ExpressRequest } from 'express';
import { UserRepositoryService } from 'src/oauth/repositories/UserRepositoryService';
import { User } from '../entities/User';

@Controller('register')
export class RegisterController {
    constructor(
        private readonly userRepository: UserRepositoryService,
    ) {}

    @Get()
    async index(
        @Response() res: ExpressResponse,
    ): Promise<void> {
        return res.render('register');
    }

    @Post('/register')
    async register(
        @Session() session: Record<string, any>,
        @Request() req: ExpressRequest,
        @Response() res: ExpressResponse,
    ): Promise<void> {
        const userEntity = new User({
            email: req.body['email'],
            passwordHash: req.body['password'],
            name: '',
            role: req.body['role'],
        });

        await this.userRepository.persist(userEntity);

        session.user = { id: userEntity.id };

        return res.redirect('/');
    }
}
