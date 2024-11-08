import { Module } from '@nestjs/common';
import { VideoService } from '../services/lesson.service';
import { VideoController } from '../controllers/lesson.controller';
import { VideoEntity } from 'src/entities/lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  controllers: [VideoController],
  providers: [VideoService],
})
export class LessonModule {}
