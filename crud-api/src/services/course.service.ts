import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../dtos/course/create-course.dto';
import { CourseEntity } from 'src/entities/course.entity';
import { LessonEntity } from 'src/entities/lesson.entity';

@Injectable()
export class CourseService {
  courses: CourseEntity[] = [
    {
      id: 1,
      category: 'testando',
      name: 'teste usuario 2',
      lessons: [
        { id: 1, name: 'testar', youtubeUrl: 'OBmlCZTF4Xs', courseId: 1 },
      ],
      userId: 2,
    },
    {
      id: 2,
      category: 'testando',
      name: 'teste 2 usuario 2',
      lessons: [
        {
          id: 2,
          name: 'testar novamente',
          youtubeUrl: '7hHZnvjCbVw',
          courseId: 2,
        },
      ],
      userId: 2,
    },
    {
      id: 3,
      category: 'testando',
      name: 'nova tarefa usuario 2',
      lessons: [
        { id: 3, name: 'testar ', youtubeUrl: 'm3lF2qEA2cw', courseId: 3 },
        { id: 4, name: 'testar 2', youtubeUrl: '7hHZnvjCbVw', courseId: 3 },
      ],
      userId: 2,
    },
    {
      id: 4,
      category: 'testando',
      name: 'nova tarefa usuario',
      lessons: [
        {
          id: 5,
          name: 'testar novamente',
          youtubeUrl: '7hHZnvjCbVw',
          courseId: 4,
        },
      ],
      userId: 1,
    },
    {
      id: 5,
      category: 'testando',
      name: 'teste demo usuario',
      lessons: [{ id: 6, name: 'demo', youtubeUrl: 'm3lF2qEA2cw', courseId: 5 }],
      userId: 1,
    },
    {
      id: 6,
      category: 'testando',
      name: 'teste demo 2 usuario',
      lessons: [
        { id: 7, name: 'demo 2', youtubeUrl: 'OBmlCZTF4Xs', courseId: 6 },
      ],
      userId: 1,
    },
    {
      id: 7,
      category: 'testando',
      name: 'tarefa demo usuario',
      lessons: [
        { id: 8, name: 'demo ', youtubeUrl: '7hHZnvjCbVw', courseId: 7 },
        { id: 9, name: 'demo 2', youtubeUrl: 'OBmlCZTF4Xs', courseId: 7 },
      ],
      userId: 1,
    },
  ];

  create(createCourseDto: CreateCourseDto, userId: number) {
    const idCourse = Math.random() * 100;
    const newLessons: LessonEntity[] = [];

    createCourseDto.lessons.forEach((s) =>
      newLessons.push({ ...s, courseId: idCourse }),
    );

    for (const lesson of newLessons) {
      lesson.id = Math.random() * 100;
    }

    const newCourse: CourseEntity = {
      ...createCourseDto,
      id: idCourse,
      userId: userId,
      lessons: newLessons,
    };

    this.courses.push(newCourse);
    console.log(this.courses);
    return CreateCourseDto;
  }

  findAll() {
    return this.courses;
  }

  findAllByUser(id: number) {
    return this.courses.filter((t) => t.userId == id);
  }

  findOne(id: number) {
    return this.courses.find((t) => t.id == id);
  }

  update(idCourse: number, updateCourseDto: CreateCourseDto, userId: number) {
    const updatedLessons: LessonEntity[] = [];

    updateCourseDto.lessons.forEach((s) =>
      updatedLessons.push({ ...s, courseId: idCourse }),
    );

    const updatedCourse: CourseEntity = {
      ...updateCourseDto,
      id: idCourse,
      userId: userId,
      lessons: updatedLessons,
    };

    const newCourses = this.courses.map((course) =>
      course.id === idCourse
        ? { ...updatedCourse, lessons: updatedLessons }
        : course,
    );

    this.courses = newCourses;

    return updateCourseDto;
  }

  remove(id: number) {
    let course = this.courses.find((course) => course.id == id);
    this.courses = this.courses.filter((course) => course.id !== id);

    return course;
  }
}
