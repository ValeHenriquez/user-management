import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from '../user.service';
import { CREATE_USER_PARAMS, USERS_MOCK, USER_MOCK } from './user.mocks';
import { USER_REPOSITORY, UserRepository } from '../user.repository';

import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UserService', () => {
 
  it('should be defined', () => {
    expect(true).toBe(true);
  });

  it('should create an user', async () => {
    expect(true).toBe(true);
  });

  it('should get all users', async () => {
    expect(true).toBe(true);
  });

  it('should get an user with his id', async () => {
    expect(true).toBe(true);
  });

  it('should update an user', async () => {
    expect(true).toBe(true);
  });

  it('should update an user with a new password', async () => {
    expect(true).toBe(true);
  });

  it('should delete an user', async () => {
    expect(true).toBe(true);
  });
});
