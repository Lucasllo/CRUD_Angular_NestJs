import { CoursesViewComponent } from './components/courses-view/courses-view.component';
import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { resolveUserName } from './guards/user.resolver';
import { resolveCourse } from './guards/course.resolver';
import { resolveUserCourses } from './guards/user-courses.resolver';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserService } from './services/user.service';

const canMatch: CanMatchFn = async (route, segments) => {
  const router = inject(Router);
  const userService = inject(UserService);
  let retorno: boolean | RedirectCommand = true;
  await firstValueFrom(userService.check()).catch(() => {
    retorno = new RedirectCommand(router.parseUrl('/'));;
   });
  return retorno;
};

export const routes: Routes = [
  {
    title: 'CRUD',
    path: '',
    redirectTo: () =>{
      if(localStorage.getItem('token')){
        return 'user'
      }else{
        return 'home'
      }
    },
    pathMatch: 'full',
  },
  {
    title: 'CRUD',
    path: 'home',
    component: HomeComponent,
  },
  {
    title: 'Login',
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
  },
  {
    title: 'Registrar',
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (mod) => mod.RegisterComponent
      ),
  },
  {
    title: resolveUserName,
    path: 'user',
    loadChildren: () =>
      import('./routes/user.routes').then((mod) => mod.routes),
    resolve: {
      userCourses: resolveUserCourses,
    },
    runGuardsAndResolvers: 'always',
    canMatch: [canMatch],
  },
  {
    title: 'Nova Tarefa',
    path: 'home/course/new',
    loadComponent: () =>
      import('./components/course-form/course-form.component').then(
        (mod) => mod.CourseFormComponent
      ),
  },
  {
    title: 'Editar Tarefa',
    path: 'home/course/edit/:idCourse',
    loadComponent: () =>
      import('./components/course-form/course-form.component').then(
        (mod) => mod.CourseFormComponent
      ),
    resolve: {
      course: resolveCourse,
    },
  },
  {
    title: 'Visualizar Videos',
    path: 'home/course/player/:idCourse',
    loadComponent: () =>
      import('./components/courses-view/courses-view.component').then(
        (mod) => mod.CoursesViewComponent
      ),
    resolve: {
      course: resolveCourse,
    },
  },
];
