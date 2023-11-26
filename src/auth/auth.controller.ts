import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login() {
    return this.authService.login();
  }

  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register();
  }
}
