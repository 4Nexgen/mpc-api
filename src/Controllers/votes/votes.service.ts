import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { Candidate } from '../candidates/entities/candidate.entity';
import { BadRequestException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,

    @InjectRepository(Candidate)
    private candidatesRepository: Repository<Candidate>,
  ) {}

  async verifyCaptcha(captchaToken: string): Promise<void> {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Store in .env
    const url = `https://www.google.com/recaptcha/api/siteverify`;

    try {
      const { data } = await axios.post(url, null, {
        params: {
          secret: secretKey,
          response: captchaToken,
        },
      });

      if (!data.success) {
        throw new BadRequestException('Invalid CAPTCHA verification.');
      }
    } catch (error) {
      throw new BadRequestException('Failed to verify CAPTCHA.');
    }
  }

  async create(createVoteDto: CreateVoteDto): Promise<Vote> {
    await this.verifyCaptcha(createVoteDto.captchaToken);

    const existingVote = await this.voteRepository.findOne({
      where: { email: createVoteDto.email },
    });

    if (existingVote) {
      throw new BadRequestException('This email has already voted.');
    }

    // Save the vote
    const vote = this.voteRepository.create(createVoteDto);
    await this.voteRepository.save(vote);

    // Increment total votes for each candidate
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
