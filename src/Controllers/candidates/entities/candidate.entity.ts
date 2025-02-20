import { Vote } from 'src/Controllers/votes/entities/vote.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  remarks: string;

  @Column()
  total_votes: number;

  @Column()
  image_url: string;

  @ManyToMany(() => Vote, (vote) => vote.candidate_id)
  votes: Vote[];
}
