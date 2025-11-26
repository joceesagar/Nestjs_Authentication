import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { DbconnectService } from "src/dbconnect/dbconnect.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt' // use can leave it blank this will be by default named as 'jwt' and we can change it too
) {
    constructor(private config: ConfigService, private dbconnect: DbconnectService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('JWT_SECRET')!,
        });
    }

    async validate(payload: {
        sub: number,
        email: string,
    }) {
        const user = await this.dbconnect.user.findUnique({
            where: {
                id: payload.sub
            }
        })

        if (!user) {
            throw new UnauthorizedException();
        }
        const { hash, ...userWithoutHash } = user
        return userWithoutHash; // this returned thing will be available in request on protected route means after this the request is forwarded to routes with the returned thing here in req.user (whatever we name here it will be inside req.user)
    }
}
