import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import { SignReturn } from './types';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  async validateUser({
    username,
    password,
  }: LoginDto): Promise<HttpException | SignReturn> {
    const user = await this.usersRepository.findOneBy({ username, password });
    if (user) {
      const payload = { sub: user.id, username: user.username };
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    }
    return new HttpException(
      'invalid username or password',
      HttpStatus.BAD_REQUEST,
    );
  }
}
