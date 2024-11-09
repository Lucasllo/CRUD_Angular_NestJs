import { Component, OnInit, computed, inject, input } from "@angular/core";
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
import { ActivatedRoute, Router } from "@angular/router";
import { PlaylistService } from "../../services/playlist.service";
import { Video } from "../../models/video";
import { Location } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatSelect } from "@angular/material/select";
import { MatButtonModule, MatIconButton } from "@angular/material/button";
import { Playlist } from "../../models/playlist";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-playlist-form",
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
    MatIcon,
  ],
  templateUrl: "./playlist-form.component.html",
  styleUrl: "./playlist-form.component.css",
})
export class PlaylistFormComponent implements OnInit {
  private readonly playlistService = inject(PlaylistService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  private readonly location = inject(Location);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly dialog = inject(MatDialog);

  form!: FormGroup;
  playlist = input.required<Playlist>();
  submitted = false;
  categories = this.playlistService.allCategories;

  async ngOnInit() {
    this.createForm();
  }

  createForm() {
    let playlist = computed(() =>
      this.playlist()
        ? this.playlist()
        : { id: "", name: "", category: "", videos: [] }
    );

    this.form = this.formBuilder.group({
      id: new FormControl(playlist().id),
      name: new FormControl(playlist().name, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      }),
      category: new FormControl(playlist().category, {
        validators: [Validators.required],
      }),
      videos: this.formBuilder.array(
        this.retrieveVideos(playlist()),
        Validators.required
      ),
    });
  }

  private retrieveVideos(playlist: Playlist) {
    const videos = [];

    if (playlist?.videos) {
      playlist.videos.forEach((video) => {
        videos.push(this.createVideo(video));
      });
    } else {
      videos.push(this.createVideo());
    }

    return videos;
  }

  private createVideo(video: Video = { id: "", name: "", youtubeUrl: "" }) {
    return this.formBuilder.group({
      _id: new FormControl(video.id),
      name: new FormControl(video.name, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      }),
      youtubeUrl: new FormControl(video.youtubeUrl, {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
        ],
      }),
    });
  }

  addVideo() {
    const video = this.form.get("videos") as UntypedFormArray;
    video.push(this.createVideo());
  }

  removeVideo(index: number) {
    const video = this.form.get("videos") as UntypedFormArray;
    video.removeAt(index);
  }

  getVideosFormArray() {
    return (<UntypedFormArray>this.form.get("videos")).controls;
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.router.url.includes("/user/playlists")) {
        this.playlistService.save(this.form.value).subscribe({
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
        this.playlistService.saveDemo(this.form.value).subscribe({
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
    const videos = this.form.get("videos") as UntypedFormArray;
    return !videos.valid && videos.hasError("required") && videos.touched;
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
        this.playlistService.updateCategories(result);
      }
    });
  }
}
