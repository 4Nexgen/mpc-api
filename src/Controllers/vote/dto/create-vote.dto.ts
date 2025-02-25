import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, isNotEmpty, IsOptional } from 'class-validator';

export class CreateVoteDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  candidate_id: string;

  @ApiProperty()
  @IsOptional()
  email: string;

  @ApiProperty()
  remarks: string;
}
