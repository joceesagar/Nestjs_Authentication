import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtGuard) //--> root level guard
@Controller('users')
export class UserController {
    // @UseGuards(AuthGuard('jwt')) --> without importing from seperate folder
    // @UseGuards(JwtGuard) --> Route level guard
    @Get('me')
    getMe(@Req() req: Request) {
        return req.user;
    }
}
