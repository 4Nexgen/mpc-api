import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type VoteDocument = HydratedDocument<Vote>;

@Schema()
export class Vote {
  @Prop()
  id: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Candidate' }], required: true })
  candidate_id: Types.ObjectId;

  @Prop({ unique: true })
  email: string;

  @Prop({ default: '-' })
  remarks: string;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
