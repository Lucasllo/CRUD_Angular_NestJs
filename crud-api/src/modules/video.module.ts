import { Module } from "@nestjs/common";
import { VideoService } from "../services/video.service";
import { VideoController } from "../controllers/video.controller";
import { VideoEntity } from "../entities/video.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VideoRepository } from "../repositories/video.repository";

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  controllers: [VideoController],
  providers: [VideoService, VideoRepository],
})
export class VideoModule {}
