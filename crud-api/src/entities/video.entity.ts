import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PlaylistEntity } from "./playlist.entity";

@Entity({ name: "video" })
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

  @Column({ name: "playlistId" })
  playlistId: number;

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.videos)
  @JoinColumn({ name: "playlistId" })
  playlist?: PlaylistEntity;
}
