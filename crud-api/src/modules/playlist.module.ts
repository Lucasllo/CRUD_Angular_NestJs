import { Module } from "@nestjs/common";
import { PlaylistService } from "../services/playlist.service";
import { PlaylistController } from "../controllers/playlist.controller";
import { PlaylistEntity } from "../entities/playlist.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlaylistRepository } from "../repositories/playlist.repository";

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity])],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistRepository],
})
export class PlaylistModule {}
