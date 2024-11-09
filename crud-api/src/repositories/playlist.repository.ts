import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlaylistEntity } from "src/entities/playlist.entity";
import { Repository } from "typeorm";

@Injectable()
export class PlaylistRepository {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>
  ) {}

  public async save(playlist: PlaylistEntity): Promise<PlaylistEntity> {
    return await this.playlistRepository.save(playlist);
  }

  public async findById(id: number): Promise<PlaylistEntity> {
    return this.playlistRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async delete(id: number): Promise<void> {
    const playlist = await this.findById(id);
    this.playlistRepository.delete(playlist);
  }

  public async findAll() {
    const playlists: PlaylistEntity[] = await this.playlistRepository.find();
    return playlists;
  }
}
