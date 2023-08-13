import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { OAuthStrategy } from './oauth.strategy';
import { OAuthAuthGuard } from './oauth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { JwtModule } from '@nestjs/jwt';
import { UserRepositoryService } from './user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule,
    ],
    controllers: [UserController],
    providers: [OAuthStrategy, OAuthAuthGuard, UserRepositoryService],
})
export class UserModule {}
