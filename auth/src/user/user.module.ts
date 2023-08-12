import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { LoginController } from './login/login.controller';
import { UserRepositoryService } from 'src/oauth/repositories/UserRepositoryService';
import { RegisterController } from './register/register.controller';
import { DashboardController } from './dashboard/dashboard.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [UserRepositoryService],
    controllers: [LoginController, RegisterController, DashboardController],
})
export class UserModule {}
