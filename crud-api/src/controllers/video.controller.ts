import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { VideoService } from "../services/video.service";
import { CreateVideoDto } from "../dtos/video/create-video.dto";
import { UpdateVideoDto } from "../dtos/video/update-video.dto";
import { AuthGuard } from "../guards/auth.guard";
import { Public } from "src/decorators/public.decorator";

UseGuards(AuthGuard);
@Controller("video")
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @Get("videosByPlaylist/:playlistId")
  videosByPlaylist(@Param("playlistId") id: string) {
    return this.videoService.videosByPlaylist(Number(id));
  }

  @Public()
  @Get()
  findAll() {
    return this.videoService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.videoService.remove(+id);
  }
}
