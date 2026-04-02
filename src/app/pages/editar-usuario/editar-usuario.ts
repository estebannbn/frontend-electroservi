import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EditarUsuarioService } from '../../services/editar-usuario/editar-usuario.service';
import { AuthServiceTs } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-editar-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-usuario.html',
  styleUrl: './editar-usuario.css',
})
export class EditarUsuario implements OnInit {
  editarUsuarioForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private location: Location,
    private editarUsuarioService: EditarUsuarioService,
    private authService: AuthServiceTs
  ) {}

  ngOnInit(): void {
    this.editarUsuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContraseña: ['', Validators.required],
    });
  }

  volverAlMenu() {
    this.location.back();
  }

  onSubmit() {
    if (this.editarUsuarioForm.valid) {
      const formValue = this.editarUsuarioForm.value;
      if (formValue.contraseña !== formValue.confirmarContraseña) {
        this.editarUsuarioForm.get('confirmarContraseña')?.setErrors({ passwordMismatch: true });
        return;
      }

      this.authService.checkSession().subscribe({
          next: (res) => {
              if (res.user && res.user.id) {
                  const datosAEnviar = {
                      nombre: formValue.nombre,
                      apellido: formValue.apellido,
                      direccion: formValue.direccion,
                      telefono: formValue.telefono,
                      contraseña: formValue.contraseña
                  };

                  this.editarUsuarioService.editarUsuario(res.user.id, datosAEnviar).subscribe({
                      next: () => {
                          alert('Perfil actualizado con éxito');
                          this.location.back();
                      },
                      error: (err) => {
                          console.error('Error al actualizar', err);
                          alert('Hubo un error al actualizar los datos');
                      }
                  });
              }
          },
          error: (err) => {
              console.error('Error verificando sesión', err);
              alert('Primero debés iniciar sesión para editar tu perfil');
          }
      });
    } else {
      this.editarUsuarioForm.markAllAsTouched();
    }
  }
}
