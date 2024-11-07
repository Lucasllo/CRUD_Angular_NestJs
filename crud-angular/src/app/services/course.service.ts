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
  private readonly initialCourses = [
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
  ];
  private readonly initialCategories = ['Front-end', 'Back-end'];

  private readonly categories = signal<string[]>([]);
  private readonly courses = signal<Course[]>([]);

  allCourses = this.courses.asReadonly();
  allCategories = this.categories.asReadonly();

  constructor() {
    this.initCourses();
  }

  initCourses() {
    let coursesDemo = localStorage.getItem('coursesDemo');
    if (coursesDemo) {
      this.courses.set(JSON.parse(coursesDemo));
    } else {
      this.resetCourses();
      localStorage.setItem('coursesDemo', JSON.stringify(this.courses()));
    }
    
    let categoriesDemo = localStorage.getItem('categoriesDemo');
    if (categoriesDemo) {
      console.log('categoria aqui')
      this.categories.set(JSON.parse(categoriesDemo));
    } else {
      this.resetCategories();
      localStorage.setItem('categoriesDemo', JSON.stringify(this.categories()));
    }
  }

  setCourses(courses: InputSignal<Course[]>){
    this.courses.set(courses());
  }

  resetCourses(){
    this.courses.set(this.initialCourses);
  }

  resetCategories(){
    this.categories.set(this.initialCategories);
  }

  updateCategories(value: string){
    this.categories.update((oldCategories)=> [...oldCategories, value])
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
    const course = this.courses().find((t) => t.id == id);
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
    ).pipe(tap({next: (data) => this.courses.set(data)}));
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
      this.courses.set(courses);
    }
    this.setCategoriesDemo(course);
    return of(newCourse);
  }

  private setCategoriesDemo(course: Course){
    let categoriesDemo = localStorage.getItem('categoriesDemo')
    if(categoriesDemo){
      if(!(JSON.parse(categoriesDemo) as Array<string>).includes(course.category)){
        localStorage.setItem('categoriesDemo', JSON.stringify(this.categories()));
      }
    }
  }

  updateDemo(courseUpdated: Course): Observable<Course> {
    let coursesDemo = localStorage.getItem('coursesDemo');
    if (coursesDemo) {
      let courses: Course[] = JSON.parse(coursesDemo);

      const newCourses = courses.map((course) =>
        course.id === courseUpdated.id ? { ...courseUpdated } : course
      );

      localStorage.setItem('coursesDemo', JSON.stringify(newCourses));
      this.courses.set(newCourses);
    }
    this.setCategoriesDemo(courseUpdated);

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

      this.courses.update((oldCourses) => oldCourses.filter((course) => course.id !== id));
      console.log(this.courses());
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
