import {
  Component,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  UntypedFormArray,
  Validators,
} from "@angular/forms";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from "@angular/material/card";
import { MatOption } from "@angular/material/core";
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel,
} from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatToolbar } from "@angular/material/toolbar";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CoursesService } from "../../services/course.service";
import { Lesson } from "../../models/lesson";
import { Location } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatSelect } from "@angular/material/select";
import {
  MatButton,
  MatButtonModule,
  MatIconButton,
} from "@angular/material/button";
import { Course } from "../../models/course";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-course-form",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardContent,
    MatFormField,
    MatHint,
    MatError,
    MatLabel,
    MatOption,
    MatToolbar,
    MatIcon,
    MatCard,
    MatCardActions,
    MatInputModule,
    MatFormFieldModule,
    MatSelect,
    MatButtonModule,
    MatIconButton,
    RouterLink,
    MatIcon,
  ],
  templateUrl: "./course-form.component.html",
  styleUrl: "./course-form.component.css",
})
export class CourseFormComponent implements OnInit {
  private readonly coursesService = inject(CoursesService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  private readonly location = inject(Location);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly dialog = inject(MatDialog);

  form!: FormGroup;
  course = input.required<Course>();
  submitted = false;
  categories = this.coursesService.allCategories;

  async ngOnInit() {
    this.createForm();
  }

  createForm() {
    let course = computed(() =>
      this.course()
        ? this.course()
        : { id: "", name: "", category: "", lessons: [] }
    );

    this.form = this.formBuilder.group({
      id: new FormControl(course().id),
      name: new FormControl(course().name, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      }),
      category: new FormControl(course().category, {
        validators: [Validators.required],
      }),
      lessons: this.formBuilder.array(
        this.retrieveLessons(course()),
        Validators.required
      ),
    });
  }

  private retrieveLessons(course: Course) {
    const lessons = [];

    if (course?.lessons) {
      course.lessons.forEach((lesson) => {
        lessons.push(this.createLesson(lesson));
      });
    } else {
      lessons.push(this.createLesson());
    }

    return lessons;
  }

  private createLesson(lesson: Lesson = { id: "", name: "", youtubeUrl: "" }) {
    return this.formBuilder.group({
      _id: new FormControl(lesson.id),
      name: new FormControl(lesson.name, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      }),
      youtubeUrl: new FormControl(lesson.youtubeUrl, {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
        ],
      }),
    });
  }

  addLesson() {
    const lesson = this.form.get("lessons") as UntypedFormArray;
    lesson.push(this.createLesson());
  }

  removeLesson(index: number) {
    const lesson = this.form.get("lessons") as UntypedFormArray;
    lesson.removeAt(index);
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get("lessons")).controls;
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.router.url.includes("/user/courses")) {
        this.coursesService.save(this.form.value).subscribe({
          next: (data) => console.log(data),
          error: (error) => {
            console.log(error);
            this.onError();
          },
          complete: () => {
            this.submitted = true;
            this.onSuccess();
            this.onCancel();
          },
        });
      } else {
        this.coursesService.saveDemo(this.form.value).subscribe({
          next: (data) => console.log(data),
          error: (error) => {
            console.log(error);
            this.onError();
          },
          complete: () => {
            this.submitted = true;
            this.onSuccess();
            console.log("complete");
            this.onCancel();
          },
        });
      }
    } else {
      this.onError();
    }
  }

  onError() {
    this.snackBar.open("Erro ao salvar curso!", undefined, {
      duration: 5000,
    });
  }

  onSuccess() {
    this.snackBar.open("Curso salvo com sucesso!", undefined, {
      duration: 5000,
    });
  }

  onCancel() {
    this.location.back();
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError("required")) {
      return "Campo obrigatorio.";
    }

    if (field?.hasError("minlength")) {
      const requiredLength = field.errors
        ? field.errors["minlength"]["requiredLength"]
        : 5;
      return `Tamanho minimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError("maxlength")) {
      const requiredLength = field.errors
        ? field.errors["maxlength"]["requiredLength"]
        : 100;
      return `Tamanho maximo excedido de ${requiredLength} caracteres.`;
    }

    return "Campo invalido.";
  }

  isFormArrayRequired() {
    const lessons = this.form.get("lessons") as UntypedFormArray;
    return !lessons.valid && lessons.hasError("required") && lessons.touched;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        header: "Nova Categoria",
        text: "Informe qual nome da categoria",
        data: "",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.form.get("category")?.setValue(result);
        this.coursesService.updateCategories(result);
      }
    });
  }
}
