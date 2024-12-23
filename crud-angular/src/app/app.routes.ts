import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { resolveUserName } from "./guards/user.resolver";
import { resolvePlaylist } from "./guards/playlist.resolver";
import { resolveUserPlaylists } from "./guards/user-playlists.resolver";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { UserService } from "./services/user.service";

const canMatch: CanMatchFn = async (route, segments) => {
  const router = inject(Router);
  const userService = inject(UserService);
  let retorno: boolean | RedirectCommand = true;
  await firstValueFrom(userService.check()).catch(() => {
    retorno = new RedirectCommand(router.parseUrl("/"));
  });
  return retorno;
};

export const routes: Routes = [
  {
    title: "Playlists",
    path: "",
    redirectTo: () => {
      if (sessionStorage.getItem("token")) {
        return "user";
      } else {
        return "home";
      }
    },
    pathMatch: "full",
  },
  {
    title: "Playlists",
    path: "home",
    component: HomeComponent,
  },
  {
    title: "Login",
    path: "login",
    loadComponent: () =>
      import("./components/login/login.component").then(
        (mod) => mod.LoginComponent
      ),
  },
  {
    title: "Registrar",
    path: "register",
    loadComponent: () =>
      import("./components/register/register.component").then(
        (mod) => mod.RegisterComponent
      ),
  },
  {
    title: resolveUserName,
    path: "user",
    loadChildren: () =>
      import("./routes/user.routes").then((mod) => mod.routes),
    resolve: {
      userPlaylists: resolveUserPlaylists,
    },
    runGuardsAndResolvers: "always",
    canMatch: [canMatch],
  },
  {
    title: "Nova Tarefa",
    path: "home/playlist/new",
    loadComponent: () =>
      import("./components/playlist-form/playlist-form.component").then(
        (mod) => mod.PlaylistFormComponent
      ),
  },
  {
    title: "Editar Tarefa",
    path: "home/playlist/edit/:idPlaylist",
    loadComponent: () =>
      import("./components/playlist-form/playlist-form.component").then(
        (mod) => mod.PlaylistFormComponent
      ),
    resolve: {
      playlist: resolvePlaylist,
    },
  },
  {
    title: "Visualizar Videos",
    path: "home/playlist/player/:idPlaylist",
    loadComponent: () =>
      import("./components/playlist-view/playlist-view.component").then(
        (mod) => mod.PlaylistViewComponent
      ),
    resolve: {
      playlist: resolvePlaylist,
    },
  },
];
