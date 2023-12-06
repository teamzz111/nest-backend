import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'src/repositories/user.repository';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

const signInData = {
  email: 'test@gmail.com',
  password: '123123',
};

const signInResult = {
  access_token: '',
};

const userResult = {
  id: '0',
  email: 'test@gmail.com',
  password: '',
  name: 'Andres',
  purchases: 1,
};

const signUpRequest = {
  email: 'test@gmail.com',
  password: '',
  name: 'Andres',
  purchases: 1,
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue(''),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findByEmailAuth: () => jest.fn().mockResolvedValue(userResult),
            signUp: () => jest.fn().mockResolvedValue(userResult),
          },
        },
      ],
    }).compile();

    jest.spyOn(bcrypt, 'compare');

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sign in user', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
    const result = await service.signIn(signInData);
    expect(result).toEqual(signInResult);
  });

  it('should fail on invalid credentials', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);
    try {
      await service.signIn(signInData);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });

  it('should signup user', async () => {
    const result = await service.signUp(signUpRequest);
    expect(result).toEqual(signInResult);
  });
});
