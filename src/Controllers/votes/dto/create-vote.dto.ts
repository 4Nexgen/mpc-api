import { ApiProperty } from '@nestjs/swagger';
export class CreateVoteDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  candidate_ids: number[];

  @ApiProperty()
  email: string;

  @ApiProperty()
  remarks: string;

  @ApiProperty()
  captchaToken: string; //Comment this if captcha is not needed
}
