import { Routes } from '@angular/router';
import { CoursesComponent } from '../components/courses/courses.component';
import { CourseFormComponent } from '../components/course-form/course-form.component';
import { resolveUserCourse } from '../guards/user-course.resolver';

// export const canLeaveEditPage: CanDeactivateFn<TaskFormComponent> = (component) => {
//   if (component.submitted) {
//     return true;
//   }
//   if (component.form.controls['name'].value != '' || component.form.controls['category'].value != '' || component.form.controls['step'].value.length > 0 ) {
//     return window.confirm('Você quer realmente sair da pagina? Os dados do formulario seram perdidos.')
//   }
//   return true;
// }

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full',
      },
      {
        path: 'courses',
        component: CoursesComponent,
      },
      {
        path: 'courses/course/new',
        component: CourseFormComponent,
        // canDeactivate: [canLeaveEditPage]
      },
      {
        path: 'courses/course/edit/:idCourse',
        component: CourseFormComponent,
        // canDeactivate: [canLeaveEditPage],
        resolve: {
          course: resolveUserCourse,
        },
        runGuardsAndResolvers: 'always'
      },
    ],
  },
];
