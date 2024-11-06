import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from '../dtos/lesson/create-lesson.dto';
import { UpdateLessonDto } from '../dtos/lesson/update-lesson.dto';
import { LessonEntity } from 'src/entities/lesson.entity';

@Injectable()
export class LessonService {
  lessons: LessonEntity[] = [
    { id: 1, name: 'testar', youtubeUrl: 'zzzzzzzzzz', courseId: 1 },
    { id: 2, name: 'testar novamente', youtubeUrl: 'aaaaaaaaaaa', courseId: 2 },
    { id: 3, name: 'testar ', youtubeUrl: 'zzzzzzzzzz', courseId: 3 },
    { id: 4, name: 'testar 2', youtubeUrl: 'aaaaaaaaaa', courseId: 3 },
    { id: 5, name: 'testar novamente', youtubeUrl: 'aaaaaaaaaaa', courseId: 4 },
    { id: 6, name: 'demo', youtubeUrl: 'llllllllll', courseId: 5 },
    { id: 7, name: 'demo 2', youtubeUrl: 'llllllllll', courseId: 6 },
    { id: 8, name: 'demo ', youtubeUrl: 'iiiiiiiiiii', courseId: 7 },
    { id: 9, name: 'demo 2', youtubeUrl: 'oooooooooo', courseId: 7 },
  ];

  create(createLessonDto: CreateLessonDto) {
    return 'This action adds a new step';
  }

  lessonsByCourse(id: number) {
    return this.lessons.filter((s) => s.courseId == id);
  }

  findOne(id: number) {
    return `This action returns a #${id} step`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} step`;
  }

  remove(id: number) {
    return `This action removes a #${id} step`;
  }
}
