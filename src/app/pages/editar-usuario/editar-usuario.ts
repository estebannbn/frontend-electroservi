import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EditarUsuarioService } from '../../services/editar-usuario/editar-usuario.service';
import { AuthServiceTs } from '../../services/auth-service/auth.service';

const hasLowercase: ValidatorFn = (control) => /[a-z]/.test(String(control.value ?? ''))
  ? null
  : { lowercaseRequired: true };
const hasUppercase: ValidatorFn = (control) => /[A-Z]/.test(String(control.value ?? ''))
  ? null
  : { uppercaseRequired: true };
const hasNumber: ValidatorFn = (control) => /\d/.test(String(control.value ?? ''))
  ? null
  : { numberRequired: true };

@Component({
  selector: 'app-editar-usuario',
  imports: [ReactiveFormsModule, NgbModalModule],
  templateUrl: './editar-usuario.html',
  styleUrl: './editar-usuario.css',
})
export class EditarUsuario implements OnInit {
  editarUsuarioForm!: FormGroup;
  @ViewChild('successDialog') private successDialog!: TemplateRef<unknown>;
  private modalService = inject(NgbModal);

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
      contraseña: ['', [Validators.required, Validators.minLength(8), hasLowercase, hasUppercase, hasNumber]],
      confirmarContraseña: ['', Validators.required],
    });

    this.authService.checkSession().subscribe({
      next: (res) => {
        this.editarUsuarioForm.patchValue({
          nombre: res.user.nombre,
          apellido: res.user.apellido,
          direccion: res.user.direccion,
          telefono: res.user.telefono,
        });
      },
      error: (err) => {
        console.error('Error al cargar los datos del perfil', err);
        alert('No se pudieron cargar los datos del perfil');
      }
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
                          const modalRef = this.modalService.open(this.successDialog, {
                            centered: true,
                            backdrop: 'static',
                            ariaLabelledBy: 'profile-success-title',
                          });
                          modalRef.closed.subscribe(() => this.location.back());
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
