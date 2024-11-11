import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VideoEntity } from "../entities/video.entity";
import { Repository } from "typeorm";

@Injectable()
export class VideoRepository {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>
  ) {}

  public async save(video: VideoEntity): Promise<VideoEntity> {
    return await this.videoRepository.save(video);
  }

  public async findById(id: number): Promise<VideoEntity> {
    return this.videoRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async delete(id: number): Promise<void> {
    const video = await this.findById(id);
    this.videoRepository.delete(video);
  }

  public async findAll() {
    const videos: VideoEntity[] = await this.videoRepository.find();
    return videos;
  }
}
