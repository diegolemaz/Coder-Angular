import { concatMap, Observable } from "rxjs"
import { Usuario, UsuarioForm } from "./models"
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";




@Injectable( {providedIn: 'root'} )
export class UsuarioService  {
  constructor(private http: HttpClient){}

  // GET USUARIOS Y BORRARUSUARIO HTTP
    getUsuarios$(): Observable<Usuario[]> { 
      return this.http.get<Usuario[]>(`http://localhost:3000/users`)
    }

    borrarUsuario(id: string): Observable<Usuario[]>{
      return this.http
      .delete<Usuario[]>(`http://localhost:3000/users/${id}`)
      .pipe(concatMap(() => this.getUsuarios$()));
    }

    // AGREGAR USUARIO HTTP
    agregarUsuario(usuario : UsuarioForm): Observable<Usuario>{
      return this.http
      .post<Usuario>(`http://localhost:3000/users/`, usuario);
    }

    // EDITAR USUARIO HTTP
    editarUsuario(id: string, usuario: UsuarioForm): Observable<Usuario> {
      return this.http
      .put<Usuario>(`http://localhost:3000/users/${id}`, usuario);
    }
}

