import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  input,
  signal,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Video } from "../../models/video";
import { MatSidenavModule } from "@angular/material/sidenav";
import { Playlist } from "../../models/playlist";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { YouTubePlayerModule } from "@angular/youtube-player";

@Component({
  selector: "app-playlist-view",
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    YouTubePlayerModule,
  ],
  templateUrl: "./playlist-view.component.html",
  styleUrl: "./playlist-view.component.css",
})
export class PlaylistViewComponent implements OnInit, AfterViewInit {
  playlist = input<Playlist>({ id: "", category: "", videos: [], name: "" });
  selectedVideo = signal<Video>({ id: "", name: "", youtubeUrl: "" });
  videoHeight = signal<number>(0);
  videoWidth = signal<number>(0);
  private route = inject(ActivatedRoute);

  @ViewChild("youTubePlayer") youTubePlayer!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    if (this.playlist().videos)
      this.selectedVideo.set(this.playlist().videos[0]);

    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  onResize(): void {
    this.videoWidth.set(this.youTubePlayer.nativeElement.clientWidth * 0.8);
    this.videoHeight.set(this.videoWidth() * 0.6);
  }

  display(video: Video) {
    this.selectedVideo.set(video);
  }

  displaySelectedVideo(video: Video) {
    return this.selectedVideo() === video;
  }
}
