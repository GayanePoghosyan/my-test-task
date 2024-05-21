import { BadRequestException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { environments } from '../configuration/config';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Token } from '../guard/jwt-auth-guard';
import { v4 as uuid } from 'uuid';

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validate(username: string, password: string) {
    try {
      const user = await this.userService.findByEmail(username);

      if (!user) {
        throw new UnauthorizedException('User does not exist');
      }

      if (!(await this.userService.validatePassword(password, user?.password))) {
        throw new UnauthorizedException('Incorrect password');
      }
      return user;
    } catch (error) {
      throw error
    }
  }

  async login(user: User): Promise<TokenResponse> {
    try {
      const payload: Token = {
        sub: user.userId,
        username: user.email,
      };

      let refresh_token: string;

      if (environments.accessTokenExpiration) {
        refresh_token = await this.jwtService.signAsync(
          payload,
          this.getRefreshTokenOptions(user),
        );
      }

      return {
        access_token: await this.jwtService.signAsync(
          payload,
          this.getAccessTokenOptions(user),
        ),
        refresh_token,
      };
    } catch (error) {
      throw error
    }
  }

  async loginWithRefreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.decode(refreshToken) as Token;

      if (!decoded) {
        throw new Error();
      }

      const user = await this.userService.validateUserById(decoded.sub);

      await this.jwtService.verifyAsync<Token>(
        refreshToken,
        this.getRefreshTokenOptions(user),
      );

      return this.login(user);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  getRefreshTokenOptions(user: User): JwtSignOptions {
    return this.getTokenOptions('refresh', user);
  }

  getAccessTokenOptions(user: User): JwtSignOptions {
    return this.getTokenOptions('access', user);
  }

  private getTokenOptions(type: 'refresh' | 'access', user: User) {
    const options: JwtSignOptions = {
      secret: environments[type + 'TokenSecret'] + user.sessionToken,
    };

    const expiration = environments[type + 'TokenExpiration'];

    if (expiration) {
      options.expiresIn = expiration;
    }

    return options;
  }

  async googleSignIn(profile: any) {
    try {
      const googleId = profile?.id
      const existentUser = await this.userService.findBy({ googleId });

      if (existentUser) {
        return this.login(existentUser);
      }

      if (!existentUser && (await this.userService.findByEmail(profile.email))) {
        throw new BadRequestException('Email already exists');
      }

      const user = await this.userService.create({
        firstName: profile.given_name,
        lastName: profile.family_name,
        email: profile.email,
        googleId: profile.id,
        password: uuid()
      });

      return this.login(user);
    } catch (error) {
      throw error
    }
  }
}