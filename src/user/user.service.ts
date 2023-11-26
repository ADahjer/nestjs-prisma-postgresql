import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EditUserDTO } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUser(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;
    return user;
  }

  async editUser(userId: string, dto: EditUserDTO) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { ...dto },
    });

    delete user.password;
    return user;
  }

  async deleteUser(userId: string) {
    const user = await this.prismaService.user.delete({
      where: { id: userId },
    });

    delete user.password;
    return user;
  }
}
