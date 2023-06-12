import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from '../../../typeorm/Entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { encodePassword } from '../../../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const userDB = await this.getUserByName(createUserDto.username);
    if (!userDB) {
      const password = await encodePassword(createUserDto.password);
      const newUser = this.userRepository.create({
        ...createUserDto,
        password,
      });
      return await this.userRepository.save(newUser);
    } else {
      throw new BadRequestException();
    }
  }

  async getUsers() {
    const user = await this.userRepository.find();
    return user;
  }

  async getUserByName(username: string) {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async findUserByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }
}
