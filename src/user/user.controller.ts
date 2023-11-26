import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUSer } from '../auth/decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUSer() user: User) {
    return user;
  }
}
