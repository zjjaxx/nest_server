import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create() {
    const user = this.usersRepository.create({
      firstName: 'zjj',
      photos: [
        {
          url: 'https://www.baidu.com',
        },
        {
          url: 'https://www.baidu.com',
        },
      ],
    });
    await this.usersRepository.save(user);
    return 'ok';
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        photos: true,
      },
    });
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
