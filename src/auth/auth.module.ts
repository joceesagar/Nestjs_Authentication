import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { DbconnectModule } from "src/dbconnect/dbconnect.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule { }