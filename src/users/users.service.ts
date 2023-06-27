import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const foundUser = this.userRepository.findOneBy({ id });
    if (!foundUser) {
      return new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    return foundUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({ id }, updateUserDto);
  }

  async remove(id: number) {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      return new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return await this.userRepository.delete({ id });
  }
}
