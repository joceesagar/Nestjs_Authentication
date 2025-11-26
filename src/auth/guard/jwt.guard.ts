import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard('jwt') {
    constructor() {
        super(); //super for calling the constructor of parent constructor (here the child constructor i.e. of JwtGuard is optional. the class will execute same in absence of this constructor too)
    }
}