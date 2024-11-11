import { Injectable } from "@nestjs/common";
import { CreateVideoDto } from "../dtos/video/create-video.dto";
import { UpdateVideoDto } from "../dtos/video/update-video.dto";
import { VideoEntity } from "../entities/video.entity";
import { VideoRepository } from "../repositories/video.repository";

@Injectable()
export class VideoService {
  videos: VideoEntity[] = [
    { id: 1, name: "testar", youtubeUrl: "zzzzzzzzzz", playlistId: 1 },
    {
      id: 2,
      name: "testar novamente",
      youtubeUrl: "aaaaaaaaaaa",
      playlistId: 2,
    },
    { id: 3, name: "testar ", youtubeUrl: "zzzzzzzzzz", playlistId: 3 },
    { id: 4, name: "testar 2", youtubeUrl: "aaaaaaaaaa", playlistId: 3 },
    {
      id: 5,
      name: "testar novamente",
      youtubeUrl: "aaaaaaaaaaa",
      playlistId: 4,
    },
    { id: 6, name: "demo", youtubeUrl: "llllllllll", playlistId: 5 },
    { id: 7, name: "demo 2", youtubeUrl: "llllllllll", playlistId: 6 },
    { id: 8, name: "demo ", youtubeUrl: "iiiiiiiiiii", playlistId: 7 },
    { id: 9, name: "demo 2", youtubeUrl: "oooooooooo", playlistId: 7 },
  ];

  constructor(private readonly videoRepository: VideoRepository) {
    // this.videos.forEach((video) => {
    //   this.videoRepository.save(this.videos[0]);
    // });
  }

  create(createVideoDto: CreateVideoDto) {
    return "This action adds a new video";
  }

  videosByPlaylist(id: number) {
    return this.videos.filter((s) => s.playlistId == id);
  }

  async findAll() {
    return await this.videoRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
