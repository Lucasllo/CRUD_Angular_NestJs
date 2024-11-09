import { Component } from "@angular/core";
import { PlaylistsComponent } from "../playlists/playlists.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [PlaylistsComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {}
