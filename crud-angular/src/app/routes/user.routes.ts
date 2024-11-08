import { Routes } from '@angular/router';
import { PlaylistsComponent } from '../components/courses/courses.component';
import { PlaylistFormComponent } from '../components/course-form/course-form.component';
import { resolveUserPlaylist } from '../guards/user-playlist.resolver';
import { PlaylistsViewComponent } from '../components/courses-view/courses-view.component';

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
        component: PlaylistsComponent,
      },
      {
        path: 'courses/course/new',
        component: PlaylistFormComponent,
        // canDeactivate: [canLeaveEditPage]
      },
      {
        path: 'courses/course/edit/:idCourse',
        component: PlaylistFormComponent,
        // canDeactivate: [canLeaveEditPage],
        resolve: {
          playlist: resolveUserPlaylist,
        },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'courses/course/player/:idCourse',
        component: PlaylistsViewComponent,
        resolve: {
          playlist: resolveUserPlaylist,
        },
      },
    ],
  },
];
