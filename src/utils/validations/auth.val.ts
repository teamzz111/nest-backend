import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SignInDto, SignUpDto } from 'src/core/dtos/user.dto';

class AuthValidationSignIn implements SignInDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

class AuthValidationSignOut implements SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  purchases: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

export { AuthValidationSignIn, AuthValidationSignOut };
