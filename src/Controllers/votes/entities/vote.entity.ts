import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Candidate } from 'src/Controllers/candidates/entities/candidate.entity';
@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  candidate_id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  remarks: string;

  @ManyToMany(() => Candidate, (candidate) => candidate.total_votes)
  @JoinTable()
  candidates: Candidate[];
}
