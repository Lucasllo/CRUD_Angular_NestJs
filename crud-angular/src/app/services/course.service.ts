import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, InputSignal, inject, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { UserService } from './user.service';
import { Course } from '../models/course';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private initialValues = [
    {
      id: '1',
      category: 'testando',
      name: 'teste demo',
      lessons: [{ id: '1', name: 'demo', youtubeUrl: 'm3lF2qEA2cw' }],
    },
    {
      id: '2',
      category: 'testando',
      name: 'teste demo 2',
      lessons: [{ id: '1', name: 'demo 2', youtubeUrl: '7hHZnvjCbVw' }],
    },
    {
      id: '3',
      category: 'testando',
      name: 'tarefa demo',
      lessons: [
        { id: '1', name: 'demo ', youtubeUrl: 'm3lF2qEA2cw' },
        { id: '2', name: 'demo 2', youtubeUrl: '7hHZnvjCbVw' },
      ],
    },
  ]
  private readonly demoCourses = signal<Course[]>([]);

  private readonly courses = signal<Course[]>([
    {
      id: '1',
      category: 'testando',
      name: 'teste',
      lessons: [{ id: '1', name: 'testar', youtubeUrl: 'zzzzzzzzzz' }],
    },
    {
      id: '2',
      category: 'testando',
      name: 'teste 2',
      lessons: [
        { id: '1', name: 'testar novamente', youtubeUrl: 'aaaaaaaaaaa' },
      ],
    },
    {
      id: '3',
      category: 'testando',
      name: 'nova tarefa',
      lessons: [
        { id: '1', name: 'testar ', youtubeUrl: 'zzzzzzzzzz' },
        { id: '2', name: 'testar 2', youtubeUrl: 'aaaaaaaaaa' },
      ],
    },
    {
      id: '4',
      category: 'testando',
      name: 'nova tarefa 2',
      lessons: [
        { id: '1', name: 'testar novamente', youtubeUrl: 'aaaaaaaaaaa' },
      ],
    },
    {
      id: '5',
      category: 'testando',
      name: 'teste demo',
      lessons: [{ id: '1', name: 'demo', youtubeUrl: 'llllllllll' }],
    },
    {
      id: '6',
      category: 'testando',
      name: 'teste demo 2',
      lessons: [{ id: '1', name: 'demo 2', youtubeUrl: 'llllllllll' }],
    },
    {
      id: '7',
      category: 'testando',
      name: 'tarefa demo',
      lessons: [
        { id: '1', name: 'demo ', youtubeUrl: 'iiiiiiiiiii' },
        { id: '2', name: 'demo 2', youtubeUrl: 'oooooooooo' },
      ],
    },
  ]);

  allCourses = this.demoCourses.asReadonly();

  constructor() {
    this.getAllCourses();
  }

  getAllCourses() {
    this.resetCourses();
    let coursesDemo = localStorage.getItem('coursesDemo');
    if (coursesDemo) {
      this.demoCourses.set(JSON.parse(coursesDemo));
    } else {
      localStorage.setItem('coursesDemo', JSON.stringify(this.demoCourses()));
    }
  }

  setCourses(courses: InputSignal<Course[]>){
    this.demoCourses.set(courses());
  }

  resetCourses(){
    this.demoCourses.set(this.initialValues);
  }

  save(course: Course): Observable<Course> {
    if (course.id == '') {
      return this.create(course);
    } else {
      return this.update(course);
    }
  }

  saveDemo(course: Course): Observable<Course> {
    if (course.id == '') {
      return this.createDemo(course);
    } else {
      return this.updateDemo(course);
    }
  }

  loadById(id: string): Observable<Course> {
    const course = this.demoCourses().find((t) => t.id == id);
    if (course) {
      return of(course);
    }
    return of();
  }

  loadUserCourseById(id: string): Observable<Course> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.httpClient.get<Course>(`http://localhost:3000/course/` + id, {
      headers: headers,
    });
  }

  loadByUserId(): Observable<Course[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.httpClient.get<Course[]>(
      `http://localhost:3000/course/coursesByUser`,
      { headers: headers }
    ).pipe(tap({next: (data) => this.demoCourses.set(data)}));
  }

  create(course: Course): Observable<Course> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.httpClient.post<Course>(
      `http://localhost:3000/course`,
      course,
      {
        headers: headers,
      }
    );
  }

  update(courseUpdated: Course): Observable<Course> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.httpClient.patch<Course>(
      `http://localhost:3000/course/` + courseUpdated.id,
      courseUpdated,
      {
        headers: headers,
      }
    );
  }

  createDemo(course: Course): Observable<Course> {
    const newCourse: Course = {
      ...course,
      id: (Math.random() * 100).toFixed(3).toString(),
    };

    for (const lesson of course.lessons) {
      lesson.id = (Math.random() * 100).toFixed(3).toString();
    }

    let coursesDemo = localStorage.getItem('coursesDemo');
    if (coursesDemo) {
      let courses: Course[] = JSON.parse(coursesDemo);

      courses.push(newCourse);
      localStorage.setItem('coursesDemo', JSON.stringify(courses));
      this.demoCourses.set(courses);
    }

    return of(newCourse);
  }

  updateDemo(courseUpdated: Course): Observable<Course> {
    let coursesDemo = localStorage.getItem('coursesDemo');
    if (coursesDemo) {
      let courses: Course[] = JSON.parse(coursesDemo);

      const newCourses = courses.map((course) =>
        course.id === courseUpdated.id ? { ...courseUpdated } : course
      );

      localStorage.setItem('coursesDemo', JSON.stringify(newCourses));
      this.demoCourses.set(newCourses);
    }

    return of(courseUpdated);
  }

  deleteCourse(id: string){
    if (this.router.url.includes('/user/courses')) {
      return this.delete(id);
    }else{
      return this.deleteDemo(id);
    }
  }

  deleteDemo(id: string) {
    let coursesDemo = localStorage.getItem('coursesDemo');
    let course = null;
    if (coursesDemo) {
      let courses: Course[] = JSON.parse(coursesDemo);
      course = courses.find((course) => course.id == id);
      const newCourses = courses.filter((course) => course.id !== id);

      localStorage.setItem('coursesDemo', JSON.stringify(newCourses));

      this.demoCourses.update((oldCourses) => oldCourses.filter((course) => course.id !== id));
      console.log(this.demoCourses());
    }
    return of(course);
  }

  delete(id: string): Observable<Course>  {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.httpClient.delete<Course>(
      `http://localhost:3000/course/` + id,
      {
        headers: headers,
      }
    );
  }
}
