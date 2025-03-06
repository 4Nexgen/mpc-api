import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VoteDocument = HydratedDocument<Vote>;

@Schema()
export class Vote {
  @Prop()
  id: number;

  @Prop({ required: true }) // ✅ Store candidateId instead of ObjectId
  candidateId: number[];

  @Prop({ unique: true })
  email: string;

  @Prop({ default: '-' })
  remarks: string;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
