import { Component, OnInit, inject, signal } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatOption,
} from "@angular/material/core";
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
} from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatToolbar } from "@angular/material/toolbar";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Location } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelect } from "@angular/material/select";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { UserService } from "../../services/user.service";
import { Playlist } from "../../models/playlist";

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;

    if (val1 === val2) {
      return null;
    }

    return { notEqual: true };
  };
}

@Component({
  selector: "app-login",
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
    MatSelect,
    MatCheckbox,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardHeader,
    MatCardTitle,
    RouterLink,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  private readonly formBuilder = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  private readonly location = inject(Location);
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly _adapter =
    inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));
  private readonly router = inject(Router);

  genders = ["Prefiro não informar", "Masculino", "Feminino", "Outro"];

  ngOnInit(): void {
    this.createForm();
    this._locale.set("pt-BR");
    this._adapter.setLocale(this._locale());
  }

  createForm() {
    let course!: Playlist;
    this.form = this.formBuilder.group({
      email: new FormControl("", {
        validators: [Validators.email, Validators.required],
      }),
      senha: new FormControl("", {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let userId: string;
      this.userService
        .login(
          this.form.controls["email"].value,
          this.form.controls["senha"].value
        )
        .subscribe({
          error: (error) => {
            this.onError();
          },
          complete: () => {
            this.onSuccess();
            if (sessionStorage.getItem("token")) {
              this.router.navigate(["user", "courses"]);
            }
          },
        });
    } else {
      this.onError();
    }
  }

  onError() {
    this.snackBar.open("Erro ao logar!", undefined, {
      duration: 5000,
    });
  }

  onSuccess() {
    this.snackBar.open("Login realizado com sucesso!", undefined, {
      duration: 5000,
    });
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
}
