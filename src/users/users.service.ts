import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { UserInterface } from 'src/app.controller';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findOne(username: string) {
    return this.userRepository.query('SELECT u.1000 AS `username`, u.2000 AS `password` FROM user u WHERE u.1000=?',[username]);
  }

  async create(request:UserInterface){
    try {
      const saltOrRounds = 10;
      const password = request.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      return await this.userRepository.query('INSERT INTO user(`1000`,`2000`) VALUES (?,?)', [request.username,hash]);
    } catch (error) {
      return new Error(error)
    }
  }
}
