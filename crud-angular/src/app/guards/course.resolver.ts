import { CoursesService } from '../services/course.service';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { Course } from '../models/course';

export const resolveCourse: ResolveFn<Course> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const coursesService = inject(CoursesService);
  let course: Course = { id: '', name: '', category: '', lessons: [] };

  if (activatedRoute.paramMap && activatedRoute.paramMap.get('idCourse')) {
    coursesService
      .loadById(activatedRoute.paramMap.get('idCourse')!)
      .subscribe({
        next: (value) => (course = value),
      });
  }

  return course;
};
