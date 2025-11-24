import { Global, Module } from "@nestjs/common";
import { DbconnectService } from "./dbconnect.service";

@Global()
@Module({
    providers: [DbconnectService],
    exports: [DbconnectService]
})

export class DbconnectModule { }