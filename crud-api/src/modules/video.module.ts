import { Module } from "@nestjs/common";
import { VideoService } from "../services/video.service";
import { VideoController } from "../controllers/video.controller";
import { VideoEntity } from "src/entities/video.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VideoRepository } from "src/repositories/video.repository";

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  controllers: [VideoController],
  providers: [VideoService, VideoRepository],
})
export class VideoModule {}
