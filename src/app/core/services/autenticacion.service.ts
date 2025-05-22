import { Injectable } from "@angular/core";
import { User } from "../models";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Router } from '@angular/router';

// CONSULTA A API REST CON USUARIOS GUARDADOS

@Injectable({ providedIn: 'root' })

export class AutenticacionService {
    private _autenticacionUser$ = new BehaviorSubject<User | null>(null);
    autenticacionUser$: Observable<User | null> = this._autenticacionUser$.asObservable();
  autUsuario$: any;

    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, password: string): void {
        this.http
            .get<User[]>(`http://localhost:3000/users?email=${email}&password=${password}`)
            .subscribe({
                next: (response) => {
                    const user = response[0];
                    if (user) {
                        localStorage.setItem('token', user.token);
                        this.router.navigate(['/panel']);
                        this._autenticacionUser$.next(user);
                    } else {
                        alert('Usuario o contraseña invalida');
                    }
                },
            });

    }
    // BORRA TOKEN
    logout(): void {
        localStorage.removeItem('token');
        this._autenticacionUser$.next(null);
    }
    // VERIFICAR SI ESTA EL TOKEN GUARDADO ESTÁ ACTIVO
        vericarToken(): Observable<User | boolean> {
        const tokenGuardado = localStorage.getItem('token');
        return this.http
            .get<User[]>(`http://localhost:3000/users?token=${tokenGuardado}`)
            .pipe(
                map((response) => {
                    const user = response[0];
                    if (user) {
                        localStorage.setItem('token', user.token);
                        this._autenticacionUser$.next(user);
                        return user;
                    } else {
                        return false;
                    }
                })
            );
    }
}