import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controllers/users/user.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UsersService } from 'src/services/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserRepository, UsersService],
})
export class UserModule {}
