import { Injectable } from "@angular/core";
import { User } from "../models";

const fake_user: User = {
    id: 1,
    nombre: "Manuel Gonzalez",
    role: "admin",
    email: "manuel@gonzalez.com",
    password: "123456",
    token: "fake_token",
}



@Injectable({ providedIn: 'root' })

export class AutenticacionService {

    login(email: string, password: string): User | boolean {
        if (email === fake_user.email && password === fake_user.password) {

            localStorage.setItem('token', fake_user.token);
            return fake_user;
        }
        return false;
    }

    logout () : void {
        localStorage.removeItem('token');
    }

    vericarToken(token: string): User | boolean {
        const tokenGuardado = localStorage.getItem('token');
        if (!tokenGuardado) {
            return false;
        }
        return fake_user;
    }
}