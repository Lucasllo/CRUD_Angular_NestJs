import { Module } from '@nestjs/common';
import { PlaylistService } from '../services/course.service';
import { PlaylistController } from '../controllers/course.controller';
import { PlaylistEntity } from 'src/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class CourseModule {}
