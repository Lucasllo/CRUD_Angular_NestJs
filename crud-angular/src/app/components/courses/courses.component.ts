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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);
  courses =  this.coursesService.allCourses;
  displayedColumns: string[] = ['name', 'category', 'addCourse'];
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (this.router.url.includes('/home')) {
      this.coursesService.initCourses();
    }else if(!localStorage.getItem('coursesDemo')){
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
    this.coursesService.deleteCourse(course.id).subscribe({
      next: (data) => console.log(data),
      error: (err) => {this.onError(), console.log(err)},
      complete: () => this.onComplete()
    });
  }

  onComplete(){
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      onSameUrlNavigation: 'reload',
    })
  }

  onError() {
    this.snackBar.open('Erro ao excluir curso!', undefined, {
      duration: 5000,
    });
  }

  player(course: Course){
    this.router.navigate(['./course/player', course.id], {
      relativeTo: this.activatedRoute,
    });
  }
}
