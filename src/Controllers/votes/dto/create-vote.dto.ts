export class CreateVoteDto {
  id: number;
  candidate_ids: number[];
  email: string;
  remarks: string;
}
