import { PlaylistService } from '../services/playlist.service';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Playlist } from '../models/playlist';

export const resolveUserPlaylist: ResolveFn<Playlist> = async (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const playlistService = inject(PlaylistService);
  let playlist: Playlist = { id: '', name: '', category: '', videos: [] };
  if (activatedRoute.paramMap && activatedRoute.paramMap.get('idCourse')) {
    playlist = await firstValueFrom(
      playlistService.loadUserPlaylistById(
        activatedRoute.paramMap.get('idCourse')!
      )
    );
  }

  return playlist;
};
