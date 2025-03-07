import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCandidateDto {
  @ApiProperty({ description: 'Auto-incremented candidate ID' })
  @IsNumber()
  candidateId: number; // ✅ Update from `id` to `candidateId`

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  remarks: string;

  @ApiProperty({ description: 'Total votes count', default: 0 })
  @IsNumber()
  total_votes: number;

  @ApiProperty()
  image_url: string;
}
