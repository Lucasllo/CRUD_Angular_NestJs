import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { VideoEntity } from "./video.entity";

@Entity({ name: "playlist" })
export class PlaylistEntity {
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

  @Column({ name: "userId" })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.playlists)
  @JoinColumn({ name: "userId" })
  user?: UserEntity;

  @OneToMany(() => VideoEntity, (video) => video.playlist, {
    cascade: true,
  })
  videos: VideoEntity[];
}
