import { Module } from '@nestjs/common';
import { LessonService } from '../services/lesson.service';
import { LessonController } from '../controllers/lesson.controller';
import { LessonEntity } from 'src/entities/lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity])],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
