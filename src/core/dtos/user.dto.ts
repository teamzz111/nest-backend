interface UserDto {
  _id: string;
  email: string;
  password: string;
  purchases: number;
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
