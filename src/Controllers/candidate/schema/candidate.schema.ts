import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';
export type CandidateDocument = HydratedDocument<Candidate>;

@Schema()
export class Candidate {
  @Prop({ required: true })
  name: string;

  @Prop()
  remarks: string;

  @Prop({ default: 0 })
  total_votes: number;

  @Prop()
  image_url: string;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
