import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { Candidate } from '../candidates/entities/candidate.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,

    @InjectRepository(Candidate)
    private candidatesRepository: Repository<Candidate>,
  ) {}

  async create(createVoteDto: CreateVoteDto): Promise<Vote> {
    const vote = this.voteRepository.create(createVoteDto);
    await this.voteRepository.save(vote);

    for (const candidateId of createVoteDto.candidate_ids) {
      await this.candidatesRepository.increment(
        { id: candidateId },
        'total_votes',
        1,
      );
    }

    return vote;
  }

  findAll(): Promise<Vote[]> {
    return this.voteRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} vote`;
  }

  update(id: number, updateVoteDto: UpdateVoteDto) {
    return `This action updates a #${id} vote`;
  }

  remove(id: number) {
    return `This action removes a #${id} vote`;
  }
}
