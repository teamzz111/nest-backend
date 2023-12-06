import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto, SignUpDto } from 'src/core/dtos/user.dto';
import { UserRepository } from 'src/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(data: SignInDto) {
    const user = await this.userRepository.findByEmailAuth(data.email);

    if (user) {
      const match = await bcrypt.compare(data.password, user.password);
      if (match) {
        const payload = { sub: user._id, email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    }
    return new UnauthorizedException();
  }

  async signUp(signUpDto: SignUpDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(signUpDto.password, salt);
    const user = await this.userRepository.signUp({
      email: signUpDto.email,
      password: hashPassword,
    });

    if (user) {
      const payload = { sub: user._id, email: user.email };
      const token = await this.jwtService.signAsync(payload);
      return { access_token: token };
    }
  }
}
