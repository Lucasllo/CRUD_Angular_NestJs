import { CreateLessonDto } from '../lesson/create-lesson.dto';

export class CreateCourseDto {
  id: number;

  name: string;

  category: string;

  lessons: CreateLessonDto[];
}
