import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidate, CandidateSchema } from './schema/candidate.schema';
import { Counter, CounterSchema } from './schema/counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidate.name, schema: CandidateSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  controllers: [CandidateController],
  providers: [CandidateService],
  exports: [MongooseModule],
})
export class CandidateModule {}
