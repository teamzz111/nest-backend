import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';

const signInData = {
  email: 'test@gmail.com',
  password: '123123',
};

const signInResult = {
  access_token: '',
};

const signUpRequest = {
  email: 'test@gmail.com',
  password: '',
  name: 'Andres',
  purchases: 1,
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue(''),
          },
        },
        {
          provide: UsersService,
          useValue: {
            signIn: jest.fn().mockResolvedValue(signInResult),
            signUp: jest.fn().mockResolvedValue(signInResult),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sign in', async () => {
    const result = await controller.signIn(signInData);
    expect(result).toEqual(signInResult);
  });

  it('should sign up', async () => {
    const result = await controller.signUp(signUpRequest);
    expect(result).toEqual(signInResult);
  });
});
