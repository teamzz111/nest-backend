import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { UsersService } from 'src/services/users/users.service';
import { ROLES } from 'src/utils/constants';

import {
  AuthValidationSignIn,
  AuthValidationSignOut,
} from 'src/utils/validations/auth.val';

@ApiTags('User')
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

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Roles(ROLES.ADMIN)
  @Get('all')
  getAll() {
    return this.userService.getAll();
  }
}
