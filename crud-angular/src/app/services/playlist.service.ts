import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, InputSignal, inject, signal } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { Playlist } from "../models/playlist";
import { Router } from "@angular/router";
import { PlaylistPage } from "../models/playlist-page";

@Injectable({
  providedIn: "root",
})
export class PlaylistService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly initialPlaylists: Playlist[] = [
    {
      id: "1",
      category: "testando",
      name: "teste demo",
      videos: [{ id: "1", name: "demo", youtubeUrl: "m3lF2qEA2cw" }],
    },
    {
      id: "2",
      category: "testando",
      name: "teste demo 2",
      videos: [{ id: "1", name: "demo 2", youtubeUrl: "7hHZnvjCbVw" }],
    },
    {
      id: "3",
      category: "testando",
      name: "tarefa demo",
      videos: [
        { id: "1", name: "demo ", youtubeUrl: "m3lF2qEA2cw" },
        { id: "2", name: "demo 2", youtubeUrl: "7hHZnvjCbVw" },
      ],
    },
  ];
  private readonly initialCategories = ["Favoritos", "Pop Music", "Cursos"];

  private readonly categories = signal<string[]>([]);
  private readonly playlists = signal<Playlist[]>([]);
  private readonly elementsLength = signal<number>(0);

  allPlaylists = this.playlists.asReadonly();
  allCategories = this.categories.asReadonly();
  totalElements = this.elementsLength.asReadonly();

  constructor() {
    this.initPlaylists();
  }

  initPlaylists() {
    let playlistsDemo = sessionStorage.getItem("playlistsDemo");
    if (playlistsDemo) {
      this.playlists.set(JSON.parse(playlistsDemo));
    } else {
      this.resetPlaylists();
      sessionStorage.setItem("playlistsDemo", JSON.stringify(this.playlists()));
    }
    this.elementsLength.set(this.playlists().length);
    let categoriesDemo = sessionStorage.getItem("categoriesDemo");
    if (categoriesDemo) {
      console.log("categoria aqui");
      this.categories.set(JSON.parse(categoriesDemo));
    } else {
      this.resetCategories();
      sessionStorage.setItem(
        "categoriesDemo",
        JSON.stringify(this.categories())
      );
    }
  }

  resetPlaylists() {
    this.playlists.set(this.initialPlaylists);
    this.elementsLength.set(this.playlists().length);
  }

  resetCategories() {
    this.categories.set(this.initialCategories);
  }

  updateCategories(value: string) {
    this.categories.update((oldCategories) => [...oldCategories, value]);
  }

  save(playlist: Playlist): Observable<Playlist> {
    if (playlist.id == "") {
      return this.create(playlist);
    } else {
      return this.update(playlist);
    }
  }

  saveDemo(playlist: Playlist): Observable<Playlist> {
    if (playlist.id == "") {
      return this.createDemo(playlist);
    } else {
      return this.updateDemo(playlist);
    }
  }

  loadById(id: string): Observable<Playlist> {
    const playlist = this.playlists().find((t) => t.id == id);
    if (playlist) {
      return of(playlist);
    }
    return of();
  }

  loadUserPlaylistById(id: string): Observable<Playlist> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    });

    return this.httpClient.get<Playlist>(
      `http://localhost:3000/playlist/` + id,
      {
        headers: headers,
      }
    );
  }

  list(page = 0, pageSize = 10): Observable<PlaylistPage> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    });

    return this.httpClient
      .get<PlaylistPage>(`http://localhost:3000/playlist/playlistsByUser`, {
        params: { page, pageSize },
        headers: headers,
      })
      .pipe(
        tap({
          next: (data: PlaylistPage) => {
            this.playlists.set(data.playlists);
            this.elementsLength.set(data.total);
          },
        })
      );
  }

  loadCategoriesByUserId(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    });
    this.httpClient
      .get<{ userId: number; values: string[] }>(
        `http://localhost:3000/playlist/playlistsCategoryByUser`,
        { headers: headers }
      )
      .subscribe({
        next: (data) => {
          this.categories.set(data.values);
        },
        error: (err) => console.log(err),
      });
  }

  create(playlist: Playlist): Observable<Playlist> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    });
    return this.httpClient.post<Playlist>(
      `http://localhost:3000/playlist`,
      playlist,
      {
        headers: headers,
      }
    );
  }

  update(playlistUpdated: Playlist): Observable<Playlist> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    });
    return this.httpClient.patch<Playlist>(
      `http://localhost:3000/playlist/` + playlistUpdated.id,
      playlistUpdated,
      {
        headers: headers,
      }
    );
  }

  createDemo(playlist: Playlist): Observable<Playlist> {
    const newPlaylist: Playlist = {
      ...playlist,
      id: (Math.random() * 100).toFixed(3).toString(),
    };

    for (const video of playlist.videos) {
      video.id = (Math.random() * 100).toFixed(3).toString();
    }

    let playlistsDemo = sessionStorage.getItem("playlistsDemo");
    if (playlistsDemo) {
      let playlists: Playlist[] = JSON.parse(playlistsDemo);

      playlists.push(newPlaylist);
      sessionStorage.setItem("playlistsDemo", JSON.stringify(playlists));
      this.playlists.set(playlists);
    }
    this.setCategoriesDemo(playlist);
    return of(newPlaylist);
  }

  private setCategoriesDemo(playlist: Playlist) {
    let categoriesDemo = sessionStorage.getItem("categoriesDemo");
    if (categoriesDemo) {
      if (
        !(JSON.parse(categoriesDemo) as Array<string>).includes(
          playlist.category
        )
      ) {
        sessionStorage.setItem(
          "categoriesDemo",
          JSON.stringify(this.categories())
        );
      }
    }
  }

  updateDemo(playlistUpdated: Playlist): Observable<Playlist> {
    let playlistsDemo = sessionStorage.getItem("playlistsDemo");
    if (playlistsDemo) {
      let playlists: Playlist[] = JSON.parse(playlistsDemo);

      const newPlaylists = playlists.map((playlist) =>
        playlist.id === playlistUpdated.id ? { ...playlistUpdated } : playlist
      );

      sessionStorage.setItem("playlistsDemo", JSON.stringify(newPlaylists));
      this.playlists.set(newPlaylists);
    }
    this.setCategoriesDemo(playlistUpdated);

    return of(playlistUpdated);
  }

  deletePlaylist(id: string) {
    if (this.router.url.includes("/user/playlists")) {
      return this.delete(id);
    } else {
      return this.deleteDemo(id);
    }
  }

  deleteDemo(id: string) {
    let playlistsDemo = sessionStorage.getItem("playlistsDemo");
    let playlist = null;
    if (playlistsDemo) {
      let playlists: Playlist[] = JSON.parse(playlistsDemo);
      playlist = playlists.find((playlist) => playlist.id == id);
      const newPlaylists = playlists.filter((playlist) => playlist.id !== id);

      sessionStorage.setItem("playlistsDemo", JSON.stringify(newPlaylists));

      this.playlists.update((oldPlaylists) =>
        oldPlaylists.filter((playlist) => playlist.id !== id)
      );
      console.log(this.playlists());
    }
    return of(playlist);
  }

  delete(id: string): Observable<Playlist> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    });
    return this.httpClient.delete<Playlist>(
      `http://localhost:3000/playlist/` + id,
      {
        headers: headers,
      }
    );
  }
}
