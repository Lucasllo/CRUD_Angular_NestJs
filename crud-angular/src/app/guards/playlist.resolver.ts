import { PlaylistService } from "../services/playlist.service";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { inject } from "@angular/core";
import { Playlist } from "../models/playlist";

export const resolvePlaylist: ResolveFn<Playlist> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const playlistService = inject(PlaylistService);
  let playlist: Playlist = { id: "", name: "", category: "", videos: [] };

  if (activatedRoute.paramMap && activatedRoute.paramMap.get("idPlaylist")) {
    playlistService
      .loadById(activatedRoute.paramMap.get("idPlaylist")!)
      .subscribe({
        next: (value) => (playlist = value),
      });
  }

  return playlist;
};
