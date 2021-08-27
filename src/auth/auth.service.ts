import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { resolveSoa } from 'dns';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, role, ...userDetails } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const user = await this.userRepository.save({
        ...userDetails,
        password: hashedPassword,
        roles: [role],
      });
      return user;
    } catch (error) {
      if ((error.code = 11000)) {
        throw new BadRequestException('A user with that email already exists');
      }
      throw new InternalServerErrorException();
    }
  }
}
