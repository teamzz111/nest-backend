interface UserDto {
  userId: number;
  email: string;
  password: string;
}

interface SignInDto {
  email: string;
  password: string;
}

interface SignUpDto {
  password: string;
  email: string;
  name: string;
}

export { UserDto, SignInDto, SignUpDto };
