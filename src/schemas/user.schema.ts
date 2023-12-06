import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ROLES } from 'src/utils/constants';

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
  collection: 'users',
})
export class User {
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, default: 0 })
  purchases: number;

  @Prop({ required: true, default: ROLES.USER })
  role: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
