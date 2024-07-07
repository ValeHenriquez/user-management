import { Inject, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY, UserRepository } from './user.repository';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  createUser(body: CreateUserDto) {
    body.password = hashSync(body.password, 10);
    return this.userRepository.createUser(body);
  }

  getAllUsers() {
    return [
      {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: 'password123',
      },
      {
        id: 2,
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        password: 'securepass456',
      },
      {
        id: 3,
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        password: 'mypassword789',
      },
      {
        id: 4,
        name: 'Charlie Brown asdas',
        email: 'charlie.brown@example.com',
        password: 'mypassword789',
      },
    ];
  }

  getUser(id: number) {
    return this.userRepository.getUser(id);
  }

  updateUser(id: number, body: UpdateUserDto) {
    if (body.password) {
      body.password = hashSync(body.password, 10);
    }
    return this.userRepository.updateUser(id, body);
  }

  removeUser(id: number) {
    return this.userRepository.deleteUser(id);
  }
}
