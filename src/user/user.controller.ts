import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUSer } from '../auth/decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { EditUserDTO } from './dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUSer() user: User) {
    return this.userService.getUser(user.id);
  }

  @Patch('me')
  updateMe(@GetUSer('id') userId: string, @Body() dto: EditUserDTO) {
    return this.userService.editUser(userId, dto);
  }

  @Delete('me')
  deleteMe(@GetUSer('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
