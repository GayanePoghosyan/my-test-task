import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/schema/user.schema';
import { JwtAuthGuard } from '../guard/jwt-auth-guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(
      await this.authService.validate(body.email, body.password),
    );
  }


  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.loginWithRefreshToken(refreshToken);
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    try {
      if (await this.userService.findByEmail(body.email)) {
        throw new BadRequestException('Email already exists');
      }
      const user = await this.userService.create(body);
      return user
    } catch (error) {
      throw error
    }
  }

  @Post('googleSignIn')
  async googleAuthRedirect(@Body() user:any) {
    return await this.authService.googleSignIn(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@CurrentUser() user): Promise<User> {
    return await this.userService.validateUserById(user?.userId);
  }
}