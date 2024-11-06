import { CoursesService } from '../services/course.service';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Course } from '../models/course';

export const resolveUserCourse: ResolveFn<Course> = async (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const coursesService = inject(CoursesService);
  let course: Course = { id: '', name: '', category: '', lessons: [] };
  if (activatedRoute.paramMap && activatedRoute.paramMap.get('idCourse')) {
    course = await firstValueFrom(
      coursesService.loadUserCourseById(
        activatedRoute.paramMap.get('idCourse')!
      )
    );
  }

  return course;
};
