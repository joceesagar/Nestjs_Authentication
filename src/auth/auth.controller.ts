import { Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
@Controller('auth') // /auth
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup') // /auth/signup
    signup(@Body() dto: AuthDto) { //after validating the body received from browser we pass the request to authService
        return this.authService.signup(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto)
    }
}