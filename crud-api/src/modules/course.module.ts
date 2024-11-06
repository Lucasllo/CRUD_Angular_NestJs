import { Module } from '@nestjs/common';
import { CourseService } from '../services/course.service';
import { CourseController } from '../controllers/course.controller';
import { CourseEntity } from 'src/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
