import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceTs } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthServiceTs);
  private router = inject(Router);

  public loginForm: FormGroup = this.fb.group({
    mail: ['', [Validators.required, Validators.email]],
    contraseña: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login exitoso', response);
          if (response.tipo === 'administrador') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/clientes']);
          }
        },
        error: (err) => {
          console.error('Error al iniciar sesión', err);
          const errorMsg = err.error?.error || 'Credenciales incorrectas';

          if (errorMsg === 'Usuario no encontrado') {
            this.loginForm.get('mail')?.setErrors({ serverError: errorMsg });
          } else if (errorMsg === 'Contraseña incorrecta') {
            this.loginForm.get('contraseña')?.setErrors({ serverError: errorMsg });
          } else {
            this.loginForm.get('contraseña')?.setErrors({ serverError: errorMsg });
          }

          this.loginForm.markAllAsTouched();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
