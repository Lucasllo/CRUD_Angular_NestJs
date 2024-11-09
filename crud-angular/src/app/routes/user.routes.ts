import { Routes } from "@angular/router";
import { PlaylistsComponent } from "../components/playlists/playlists.component";
import { PlaylistFormComponent } from "../components/playlist-form/playlist-form.component";
import { resolveUserPlaylist } from "../guards/user-playlist.resolver";
import { PlaylistViewComponent } from "../components/playlist-view/playlist-view.component";

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
    path: "",
    children: [
      {
        path: "",
        redirectTo: "playlists",
        pathMatch: "full",
      },
      {
        path: "playlists",
        component: PlaylistsComponent,
      },
      {
        path: "playlists/playlist/new",
        component: PlaylistFormComponent,
        // canDeactivate: [canLeaveEditPage]
      },
      {
        path: "playlists/playlist/edit/:idPlaylist",
        component: PlaylistFormComponent,
        // canDeactivate: [canLeaveEditPage],
        resolve: {
          playlist: resolveUserPlaylist,
        },
        runGuardsAndResolvers: "always",
      },
      {
        path: "playlists/playlist/player/:idPlaylist",
        component: PlaylistViewComponent,
        resolve: {
          playlist: resolveUserPlaylist,
        },
      },
    ],
  },
];
