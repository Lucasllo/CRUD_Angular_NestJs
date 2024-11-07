import { Component, OnInit, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatOption,
} from '@angular/material/core';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { Location } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-login',
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
    MatCardTitle,
    MatCardHeader,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup<{
    name: FormControl<string | null>;
    lastName: FormControl<string | null>;
    dateBirth: FormControl<Date | null>;
    gender: FormControl<string | null>;
    email: FormControl<string | null>;
    passwords: FormGroup<{
      password: FormControl<any>;
      confirmPassword: FormControl<string | null>;
    }>;
    agree: FormControl<boolean | null>;
  }>;
  user: User = {
    name: '',
    lastName: '',
    email: '',
    dateBirth: new Date(),
    gender: '',
    password: '',
    agree: false,
  };
  private readonly formBuiler = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  private readonly location = inject(Location);
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly _adapter =
    inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));

  genders = ['Prefiro não informar', 'Masculino', 'Feminino', 'Outro'];

  ngOnInit(): void {
    this.createForm();
    this._locale.set('pt-BR');
    this._adapter.setLocale(this._locale());
  }

  createForm() {
    this.form = this.formBuiler.group({
      name: new FormControl(this.user.name, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      }),
      lastName: new FormControl(this.user.lastName, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      }),
      dateBirth: new FormControl(this.user.dateBirth, {
        validators: [Validators.required],
      }),
      gender: new FormControl<string>(this.user.gender, {
        validators: Validators.required,
      }),
      email: new FormControl(this.user.email, {
        validators: [Validators.email, Validators.required],
      }),
      passwords: new FormGroup(
        {
          password: new FormControl(this.user.password, {
            validators: [Validators.required, Validators.minLength(6)],
          }),
          confirmPassword: new FormControl('', {
            validators: [Validators.required, Validators.minLength(6)],
          }),
        },
        {
          validators: [equalValues('password', 'confirmPassword')],
        }
      ),
      agree: new FormControl(this.user.agree, {
        validators: [Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.controls.agree);
      let user: User = {
        name: this.form.controls.name.value!,
        lastName: this.form.controls.lastName.value!,
        email: this.form.controls.email.value!,
        agree: this.form.controls.agree.value!,
        dateBirth: this.form.controls.dateBirth.value!,
        gender: this.form.controls.gender.value!,
        password: this.form.controls.passwords.controls.password.value!,
      };
      console.log(user);

      this.userService.save(user).subscribe({
        error: (error) => {
          this.onError();
        },
        complete: () => {
          this.onSuccess();
          this.onCancel();
        },
      });
    } else {
      this.onError();
    }
  }

  onError() {
    this.snackBar.open('Erro ao salvar!', undefined, {
      duration: 5000,
    });
  }

  onSuccess() {
    this.snackBar.open('Cadastro realizado com sucesso!', undefined, {
      duration: 5000,
    });
  }

  onCancel() {
    this.location.back();
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatorio.';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `Tamanho minimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 100;
      return `Tamanho maximo excedido de ${requiredLength} caracteres.`;
    }

    return 'Campo invalido.';
  }
}
