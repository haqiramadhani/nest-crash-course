import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-users.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 0, name: 'Marius' },
    { id: 1, name: 'Marius' },
    { id: 2, name: 'Dustin' },
  ];

  findAll(getUserDto: GetUserDto): User[] {
    const { name } = getUserDto;
    if (name) {
      return this.users.filter((item) => item.name === name);
    }
    return this.users;
  }

  findById(id: number): User {
    const user = this.users.find((item) => item.id === id);
    if (!user) throw new NotFoundException();
    return user;
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }
}
