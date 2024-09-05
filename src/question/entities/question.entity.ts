import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Alternative } from 'src/alternatives/entities/alternative.entity';
import { Length } from 'class-validator';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ length: 3 })
  subjects: string;

  @OneToMany(() => Alternative, alternative => alternative.question)
  alternatives: Alternative[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}