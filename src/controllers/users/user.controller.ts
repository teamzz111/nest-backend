import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/services/users/users.service';
import {
  AuthValidationSignIn,
  AuthValidationSignOut,
} from 'src/utils/validations/auth.val';

@ApiTags('Autentication')
@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @Post('auth/login')
  signIn(@Body() signInDto: AuthValidationSignIn) {
    return this.userService.signIn(signInDto);
  }

  @Post('auth/signup')
  signUp(@Body() signUpDto: AuthValidationSignOut) {
    return this.userService.signUp(signUpDto);
  }
}
