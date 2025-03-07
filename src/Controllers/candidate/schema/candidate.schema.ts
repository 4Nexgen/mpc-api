import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CounterDocument } from './counter.schema';

export type CandidateDocument = HydratedDocument<Candidate>;

@Schema()
export class Candidate {
  @Prop({ unique: true })
  candidateId: number;

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

// ✅ Correctly use Counter model
CandidateSchema.pre<CandidateDocument>('save', async function (next) {
  if (this.candidateId) return next(); // Skip if already set

  const CounterModel = this.db.model<CounterDocument>('Counter'); // ✅ Get model correctly

  const counter = await CounterModel.findByIdAndUpdate(
    { _id: 'candidate_id' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  ).exec();

  this.candidateId = counter.seq;
  next();
});
