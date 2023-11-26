import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: LoginDTO) {
    // find user by email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if not found, throw error
    if (!user) {
      throw new ForbiddenException('Email or password is incorrect');
    }

    // compare password
    const isMatch = await argon.verify(user.password, dto.password);

    // if not match, throw error
    if (!isMatch) {
      throw new ForbiddenException('Email or password is incorrect');
    }

    // generate token
    const token = await this.signToken(user.id, user.email, user.name);

    // return token
    return token;
  }
  async register(dto: RegisterDTO) {
    // generate hash password
    const hashPassword = await argon.hash(dto.password);

    // save user to db
    try {
      const user = await this.prismaService.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashPassword,
        },
      });

      // generate token
      const token = await this.signToken(user.id, user.email, user.name);

      // return token
      return token;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
    }
  }

  async signToken(userId: string, email: string, name: string) {
    const payload = {
      sub: userId,
      email,
      name,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return { token };
  }
}
