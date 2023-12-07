import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
  collection: 'visits',
})
export class Visit {
  id: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: 1 })
  count: number;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
export type VisitDocument = Visit & Document;
