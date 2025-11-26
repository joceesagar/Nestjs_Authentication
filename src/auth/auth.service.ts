import { ForbiddenException, Injectable } from "@nestjs/common";
import { DbconnectService } from "src/dbconnect/dbconnect.service";
import { AuthDto } from "./dto/auth.dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "generated/prisma/internal/prismaNamespace";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable({})

export class AuthService {
    constructor(
        private dbconnect: DbconnectService,
        private jwt: JwtService,
        private config: ConfigService) { } //This means auth service needs Dbconnectservice please inject it for me (Dependency injection)

    async signup(dto: AuthDto) {
        // generate the hashed password
        const hash = await argon.hash(dto.password)

        //save the user to database
        try {
            const user = await this.dbconnect.user.create({
                data: {
                    email: dto.email,
                    hash
                },
                // select: { //only return these things
                //     id: true,
                //     email: true,
                //     createdAt: true
                // }
            })

            //or instead of select we can do this
            //const {hash, ...userWithouthash} = user

            //return the saved user
            return this.signToken(user.id, user.email)
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') { //P2002 is an duplication error. See documentation for more info
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error;
        }

    }


    async signin(dto: AuthDto) {
        //find the user by email
        const user = await this.dbconnect.user.findUnique({
            where: {
                email: dto.email
            }
        })

        //if not found throw exception
        if (!user) throw new ForbiddenException('Credentials incorrect')

        //compare passwords
        const pwmatch = await argon.verify(user.hash, dto.password)
        //if password incorrect throw exception
        if (!pwmatch) throw new ForbiddenException('Credentials incorrect')

        //send back the user
        // const { hash, ...signedInUser } = user
        return this.signToken(user.id, user.email)
    }


    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET')
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        })

        return {
            access_token: token
        }
    }
}