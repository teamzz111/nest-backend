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
}

export { UserDto, SignInDto, SignUpDto };
