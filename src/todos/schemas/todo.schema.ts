import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  createdAt: string;

  @Column({ default: false })
  itsDone: boolean;

  // @Column({ nullable: true })
  // costs: number;
}
