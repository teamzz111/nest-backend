import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/core/dtos/user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findByEmailAuth(email: string): Promise<UserDocument> {
    return this.userModel.findOne({
      email,
    });
  }

  signUp(data: SignUpDto) {
    return new this.userModel({ ...data }).save();
  }

  findAll(): Promise<UserDocument[]> {
    return this.userModel.find().select('id name email purchases isActive');
  }

  findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }

  async deleteById(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id });
  }

  async updateById(id: string, data: Partial<UserDocument>) {
    return this.userModel.updateOne({ _id: id }, data);
  }
}

export { UserRepository };
