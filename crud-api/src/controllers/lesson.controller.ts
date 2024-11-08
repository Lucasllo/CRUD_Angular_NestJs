import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VideoService } from '../services/lesson.service';
import { CreateVideoDto } from '../dtos/lesson/create-lesson.dto';
import { UpdateVideoDto } from '../dtos/lesson/update-lesson.dto';
import { AuthGuard } from '../guards/auth.guard';

UseGuards(AuthGuard);
@Controller('lesson')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @Get('lessonsByCourse/:courseId')
  findAll(@Param('courseId') id: string) {
    return this.videoService.videosByCourse(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}
