import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity({ name: 'user' })
export class UserEntity {
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
  lastName: string;

  @Column()
  dateBirth: Date;

  @Column({
    length: 127,
    unique: true,
  })
  email: string;

  @Column()
  validatedEmail: boolean;

  @Column({
    length: 127,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    length: 11,
  })
  gender: string;

  @Column()
  agree: boolean;

  @OneToMany(() => CourseEntity, (course) => course.user, {
    cascade: true,
  })
  courses: CourseEntity[];
}
