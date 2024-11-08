import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlaylistEntity } from './course.entity';

@Entity({ name: 'lesson' })
export class VideoEntity {
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
  youtubeUrl: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ name: 'courseId' })
  playlistId: number;

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.videos)
  @JoinColumn({ name: 'courseId' })
  playlist?: PlaylistEntity;
}
