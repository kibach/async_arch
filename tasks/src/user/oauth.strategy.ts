import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { JwtService } from '@nestjs/jwt';
import * as OAuth2Strategy from "passport-oauth2";
import { UserRepositoryService } from "./user.repository";

@Injectable()
export class OAuthStrategy extends PassportStrategy(OAuth2Strategy.Strategy) {
    constructor(
        private readonly config: ConfigService,
        private readonly jwtService: JwtService,
        private readonly userRepositoryService: UserRepositoryService,
    ) {
        super(
            {
                authorizationURL: 'http://localhost:4001/oauth/authorize',
                tokenURL: 'http://localhost:4001/oauth/token',
                clientID: config.get<string>('OAUTH_CLIENT_ID'),
                clientSecret: config.get<string>('OAUTH_CLIENT_SECRET'),
                callbackURL: "http://localhost:4002/user/callback"
            },
            async (accessToken: string, refreshToken: string, profile: any, cb: OAuth2Strategy.VerifyCallback): Promise<void> => {
                const decoded = this.jwtService.decode(accessToken);
                
                const userEntity = await this.userRepositoryService.getOneByPublicId(decoded['publicId']);

                if (userEntity === null) {
                    cb(new Error(`User matching public id ${decoded['publicId']} not found`));
                }

                cb(undefined, userEntity);
            },
        );
    }

    validate(...args: unknown[]): void {
        console.log(args);
    }
}
