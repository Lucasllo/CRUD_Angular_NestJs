import { CoursesService } from '../services/course.service';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Course } from '../models/course';

export const resolveUserCourses: ResolveFn<Course[]> = async (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const coursesService = inject(CoursesService);
  let courses: Course[] = [{ id: '', name: '', category: '', lessons: [] }];

  if (localStorage.getItem('token')) {
    courses = await firstValueFrom(coursesService.loadByUserId());
  }

  return courses;
};
