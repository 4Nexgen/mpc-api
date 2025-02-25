import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCandidateDto {
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  remarks: string;

  total_votes: number[];

  @ApiProperty()
  image_url: string;
}
