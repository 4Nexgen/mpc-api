import { IsEmail, IsArray, ArrayNotEmpty, IsInt } from 'class-validator';
export class CreateVoteDto {
  id: number;
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  candidate_ids: number[];
  email: string;
  remarks: string;
}
