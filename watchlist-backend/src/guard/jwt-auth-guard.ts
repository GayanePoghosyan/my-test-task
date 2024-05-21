import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    Inject,
    forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { IClient, getClient } from 'src/utils/get-client';

export interface Token {
    sub: string;
    username: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
    reflector: Reflector;

    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
        @Inject(forwardRef(() => UserService)) private userService: UserService,
    ) {
        this.reflector = new Reflector();
    }

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const client = this.getRequest(ctx);

        try {
            client.user = await this.handleRequest(ctx, client);
        } catch (e) {
            throw e;
        }

        return client.user != null;
    }

    private async handleRequest(ctx: ExecutionContext, client: IClient) {
        const token = this.getToken(ctx, client);

        const decoded = this.jwtService.decode(token) as Token;

        if (!decoded) {
            this.throwException(ctx, 'Unable to decode token');
        }

        try {
            const user = await this.validate(decoded);

            await this.jwtService.verifyAsync<Token>(
                token,
                this.authService.getAccessTokenOptions(user),
            );

            return user;
        } catch (e) {
            this.throwException(ctx, 'Invalid token');
        }
    }

    private validate({ sub }: Token) {
        return this.userService.validateUserById(sub);
    }

    private getToken(ctx: ExecutionContext, client: IClient): string {
        const authorization = client.headers.authorization?.split(' ');

        if (!authorization) {
            this.throwException(ctx, 'Token not found');
        }

        if (authorization[0].toLowerCase() !== 'bearer') {
            this.throwException(ctx, 'Authorization type not valid');
        }

        if (!authorization[1]) {
            this.throwException(ctx, 'Token not provided');
        }

        return authorization[1];
    }

    throwException(ctx: ExecutionContext, message: string) {

        throw new UnauthorizedException(message);
    }

    private getRequest(ctx: ExecutionContext) {
        return getClient(ctx);
    }
}