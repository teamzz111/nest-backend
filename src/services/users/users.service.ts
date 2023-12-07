import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto, SignUpDto } from 'src/core/dtos/user.dto';
import { UserRepository } from 'src/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ROLES } from 'src/utils/constants';

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
          id: user._id,
          name: user.name,
          email: user.email,
          isActive: user.isActive,
          access_token: await this.jwtService.signAsync(payload, {
            expiresIn: '30d',
          }),
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
      name: signUpDto.name,
      password: hashPassword,
    });

    if (user) {
      const payload = { sub: user._id, email: user.email };
      const token = await this.jwtService.signAsync(payload);
      return { access_token: token };
    }
  }

  async getAll() {
    return this.userRepository.findAll();
  }

  async getRoleById(id: string) {
    const result = await this.userRepository.findById(id);
    return result?.role || ROLES.USER;
  }
}
