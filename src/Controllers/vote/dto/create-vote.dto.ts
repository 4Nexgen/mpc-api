import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, isNotEmpty, IsOptional } from 'class-validator';

export class CreateVoteDto {
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  candidateId: number[];

  @ApiProperty()
  @IsOptional()
  email: string;

  @ApiProperty()
  remarks: string;
}
