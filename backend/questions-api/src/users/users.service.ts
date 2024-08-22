import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
      ) {}

    async findOneByLogin(login: string): Promise<Users> {
        return await this.usersRepository.findOne({ where: { login : login } });
    }

}
