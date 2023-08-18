import { ExtraAccessTokenFieldArgs, JwtService } from "@jmondi/oauth2-server";
import { Injectable } from "@nestjs/common";
import { User } from "src/user/entities/User";

export class CustomJWTService extends JwtService {
    extraTokenFields({ user, client }: ExtraAccessTokenFieldArgs) {
        const userEntity = user as User;

        return {
            publicId: userEntity.publicId,
        };
    }
}