import { PlaylistService } from "../services/playlist.service";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Playlist } from "../models/playlist";

export const resolveUserPlaylists: ResolveFn<Playlist[]> = async (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const playlistService = inject(PlaylistService);
  let playlists: Playlist[] = [{ id: "", name: "", category: "", videos: [] }];

  if (sessionStorage.getItem("token")) {
    playlists = (await firstValueFrom(playlistService.list())).playlists;
    playlistService.loadCategoriesByUserId();
  }

  return playlists;
};
