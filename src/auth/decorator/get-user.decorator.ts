// Property 'id' does not exist on type 'User'.

// because req.user is not typed to include id.
// By default, Express' Request type does not know that JWT guard attaches a user object.

// ✅ How to Fix It

// You must extend the Express Request type to include user with id (and other fields returned from JWT).---> Custom decorator


import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (data) {
            return request.user?.[data];
        }
        return request.user;
    },
);
