import { Token } from "./../models/token";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { User } from "../models/user";
import { catchError, map, Observable, of, tap, throwError } from "rxjs";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly API = environment.API;
  private readonly httpClient = inject(HttpClient);
  private readonly users = signal<User[]>([
    {
      id: 1,
      name: "lucas",
      lastName: "teste",
      email: "lucasteste@mailinator.com",
      dateBirth: new Date("10/10/1995"),
      password: "Asdf@1234",
      gender: "Masculino",
      agree: true,
    },
    {
      id: 2,
      name: "david",
      lastName: "teste",
      email: "davidteste@mailinator.com",
      dateBirth: new Date("11/11/1990"),
      password: "testee",
      gender: "Masculino",
      agree: true,
    },
  ]);

  private readonly logado = signal<boolean>(
    sessionStorage.getItem("token") ? true : false
  );
  public readonly logged = this.logado.asReadonly();

  isLogado() {
    this.logado.set(sessionStorage.getItem("token") ? true : false);
  }

  save(user: User): Observable<User> {
    if (user.id) {
      return this.update(user);
    } else {
      return this.create(user);
    }
  }

  login(email: string, senha: string): Observable<Token> {
    return this.httpClient
      .post<Token>(`${this.API}/auth/login`, {
        email: email,
        password: senha,
      })
      .pipe(
        tap({
          next: (data) => {
            sessionStorage.setItem("token", data.token);
            this.logado.set(true);
          },
        })
      );
  }

  check(): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    });
    return this.httpClient
      .get<boolean>(`${this.API}/auth/check`, {
        headers: headers,
      })
      .pipe(
        catchError((error) =>
          throwError(() => {
            console.log(error);
            sessionStorage.removeItem("token");
            this.logado.set(false);
            return new Error("token invalido");
          })
        )
      );
  }

  loadById(id: number): Observable<User> {
    const user = this.users().find(
      (user) => user.id != undefined && user.id == id
    );
    if (user) {
      return of(user);
    }
    return of();
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.API}/user`, user);
  }

  update(userUpdated: User): Observable<User> {
    this.users.update((oldUsers) =>
      oldUsers.map((user) =>
        user.id === userUpdated.id ? { ...userUpdated } : user
      )
    );
    return of(userUpdated);
  }
}
