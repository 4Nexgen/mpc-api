import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Vote } from './schema/vote.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Candidate } from '../candidate/schema/candidate.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class VoteService {
  constructor(
    @InjectModel(Vote.name) private voteModel: Model<Vote>,
    @InjectModel(Candidate.name) private candidateModel: Model<Candidate>,
  ) {}

  async castVote(createVoteDto: CreateVoteDto) {
    const { email, candidateId } = createVoteDto; // ✅ `candidateId` is an array of numbers

    // **1. Check if the email already voted**
    const existingVote = await this.voteModel.findOne({ email });
    if (existingVote) {
      throw new BadRequestException('This email has already voted.');
    }

    // **2. Check if all candidate IDs exist**
    for (const id of candidateId) {
      const candidate = await this.candidateModel.findOne({ candidateId: id }); // ✅ Use number-based lookup
      if (!candidate) {
        throw new NotFoundException(`Candidate with ID ${id} not found.`);
      }

      // **3. Increment total_votes for each candidate**
      candidate.total_votes = (candidate.total_votes || 0) + 1;
      await candidate.save();
    }

    // **4. Save the new vote**
    const newVote = new this.voteModel({ email, candidate_id: candidateId });
    return newVote.save();
  }

  async findAll(): Promise<Vote[]> {
    return this.voteModel.find().exec();
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
