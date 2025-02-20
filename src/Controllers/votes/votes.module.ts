import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { Candidate } from '../candidates/entities/candidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Candidate])],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
