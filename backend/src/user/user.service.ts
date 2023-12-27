import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.create<User>(createUserDto);
    } catch (error) {
      return error.errors[0].message;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>({
      attributes: { exclude: ['password'] },
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findByPk<User>(id,{
      attributes: { exclude: ['password'] },
    });
  }

  async findByUsername(username: string): Promise<User[]> {
    return await this.userRepository.findAll<User>({
      where: { username: username },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
