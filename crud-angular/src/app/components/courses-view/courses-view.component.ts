import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Signal, ViewChild, computed, inject, input, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormArray,
  Validators,
} from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CoursesService } from '../../services/course.service';
import { Lesson } from '../../models/lesson';
import { Location } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Course } from '../../models/course';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    YouTubePlayerModule
  ],
  templateUrl: './courses-view.component.html',
  styleUrl: './courses-view.component.css',
})
export class CoursesViewComponent implements OnInit, AfterViewInit {
  course = input<Course>({id: '', category: '', lessons: [], name: ''});
  selectedLesson = signal<Lesson>({id: '', name: '', youtubeUrl: ''});
  videoHeight = signal<number>(0);
  videoWidth = signal<number>(0);
  private route = inject(ActivatedRoute);

  @ViewChild('youTubePlayer') youTubePlayer!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    if (this.course().lessons) this.selectedLesson.set(this.course().lessons[0]);

    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  onResize(): void {
    this.videoWidth.set(this.youTubePlayer.nativeElement.clientWidth * 0.9);
    this.videoHeight.set(this.videoWidth() * 0.6);
  }

  display(lesson: Lesson) {
    this.selectedLesson.set(lesson);
  }

  displaySelectedLesson(lesson: Lesson) {
    return this.selectedLesson() === lesson;
  }
}
