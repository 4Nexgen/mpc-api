import { ApiProperty } from '@nestjs/swagger';
export class CreateCandidateDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  remarks: string;

  @ApiProperty()
  total_votes: number;

  @ApiProperty()
  image_url: string;
}
