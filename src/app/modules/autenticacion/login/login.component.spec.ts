import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../../shared/shared.module';
import { AutenticacionService } from '../../../core/services/autenticacion.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, SharedModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('si el form es invalido, no se deberia hacer login y mostrar alert con error', () => {
    component.loginForm.setValue({
      email: '',
      password: '',
    });
    const alertS = spyOn(window, 'alert')
    expect(component.loginForm.valid).toBeFalsy();
    component.login();

    expect(alertS).toHaveBeenCalled();
  });

  it('si el form es valido, se deberia llamar a AutenticacionService', () => {
    component.loginForm.setValue({
      email: 'mail@dominio.com',
      password: '123456',
    });
    const autService = TestBed.inject(AutenticacionService);
    const loginSpy = spyOn(autService, 'login');
    component.login();

    expect(loginSpy).toHaveBeenCalled();
  });
});
