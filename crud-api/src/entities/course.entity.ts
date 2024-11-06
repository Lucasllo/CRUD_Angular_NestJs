import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { LessonEntity } from './lesson.entity';

@Entity({ name: 'course' })
export class CourseEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    length: 63,
  })
  name: string;

  @Column({
    length: 63,
  })
  category: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ name: 'userId' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.courses)
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @OneToMany(() => LessonEntity, (lesson) => lesson.course, {
    cascade: true,
  })
  lessons: LessonEntity[];
}
