import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login() {
    return 'This action returns all cats';
  }
  async register() {
    return 'This action returns all cats';
  }
}
