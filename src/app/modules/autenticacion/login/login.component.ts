import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../../core/services/autenticacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

constructor (private router: Router, private autentServ: AutenticacionService, private form: FormBuilder) {
  this.loginForm = this.form.group({
    email:['', [Validators.required]],
    password:['', [Validators.required]],
  })
}
  
login(){
 if (this.loginForm.invalid){
  alert ('Por favor, ingrese sus datos')
 } else {
  const { email, password } = this.loginForm.value;
  const user = this.autentServ.login(email, password);

  if (user) {
    this.router.navigate(['panel']);
  } else {
    alert('Usuario o contraseña incorrecta');
  }
 }

}
}
