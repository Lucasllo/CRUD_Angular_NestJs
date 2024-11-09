import { Component, DestroyRef, OnInit, inject, signal } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from "@angular/material/table";
import { MatToolbar } from "@angular/material/toolbar";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, Router } from "@angular/router";
import { PlaylistService } from "../../services/playlist.service";
import { Playlist } from "../../models/playlist";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-playlists",
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatHeaderCellDef,
    MatIcon,
    MatCell,
    MatCellDef,
    MatRow,
    MatRowDef,
    MatColumnDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatToolbar,
    MatCard,
    MatCardContent,
    MatButtonModule,
    MatPaginator,
  ],
  templateUrl: "./playlists.component.html",
  styleUrl: "./playlists.component.css",
})
export class PlaylistsComponent implements OnInit {
  private readonly playlistService = inject(PlaylistService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  playlists = this.playlistService.allPlaylists;
  totalElements = this.playlistService.totalElements;
  displayedColumns: string[] = ["name", "category", "addPlaylist"];
  private readonly router = inject(Router);

  pageIndex = signal<number>(0);
  pageSize = signal<number>(10);

  ngOnInit(): void {
    if (this.router.url.includes("/home")) {
      this.playlistService.initPlaylists();
    } else if (!sessionStorage.getItem("playlistsDemo")) {
      this.playlistService.resetPlaylists();
    }
  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    const subscription = this.playlistService
      .list(pageEvent.pageIndex, pageEvent.pageSize)
      .subscribe();
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onAdd() {
    this.router.navigate(["./playlist/new"], {
      relativeTo: this.activatedRoute,
    });
  }

  onEdit(playlist: Playlist) {
    this.router.navigate(["./playlist/edit", playlist.id], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(playlist: Playlist) {
    this.playlistService.deletePlaylist(playlist.id).subscribe({
      next: (data) => console.log(data),
      error: (err) => {
        this.onError(), console.log(err);
      },
      complete: () => this.onComplete(),
    });
  }

  onComplete() {
    this.router.navigate(["./"], {
      relativeTo: this.activatedRoute,
      onSameUrlNavigation: "reload",
    });
  }

  onError() {
    this.snackBar.open("Erro ao excluir curso!", undefined, {
      duration: 5000,
    });
  }

  player(playlist: Playlist) {
    this.router.navigate(["./playlist/player", playlist.id], {
      relativeTo: this.activatedRoute,
    });
  }
}
