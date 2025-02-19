import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  candidate_id: number;

  @Column()
  email: string;

  @Column()
  remarks: string;
}
