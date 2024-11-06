import { Component, OnInit, inject, input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
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
} from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../services/course.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-courses',
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
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  private readonly coursesService = inject(CoursesService);
  userCourses = input<Course[]>([]);
  courses =  this.coursesService.allCourses;
  displayedColumns: string[] = ['name', 'category', 'addCourse'];
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    if (this.router.url.includes('/user/courses')) {
      this.coursesService.setCourses(this.userCourses);
    }else if(!localStorage.getItem('coursesDemo') || this.router.url.includes('/home')){
      this.coursesService.resetCourses();
    }
  }

  onAdd() {
    this.router.navigate(['./course/new'], { relativeTo: this.activatedRoute });
  }

  onEdit(course: Course) {
    this.router.navigate(['./course/edit', course.id], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(course: Course) {
    this.coursesService.deleteCourse(course.id);
  }

  player(course: Course){
    this.router.navigate(['./course/player', course.id], {
      relativeTo: this.activatedRoute,
    });
  }
}
