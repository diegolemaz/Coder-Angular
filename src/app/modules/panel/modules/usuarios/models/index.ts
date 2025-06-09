export interface Usuario {
  id: number;
  nombre: string;
  role: string;
  email: string;
  password: string;
  direccion: string;
  tel: number;
  token: string;

}

export interface UsuarioForm {
  id: number;
  nombre: string;
  role: string;
  email: string;
  password: string;
  direccion: string;
  tel: number;
  token: string;
}
