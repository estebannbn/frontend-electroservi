import { Component, inject, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegistroFormService } from '../../services/registro-form/registro-form.service';

@Component({
  selector: 'app-registro-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro-form.html',
  styleUrl: './registro-form.css'
})


export class RegistroFormComponent implements OnInit {
  @Input() esTecnico: boolean = false;

  private registroService = inject(RegistroFormService);
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef);
  public successMessage: string | null = null;
  public showSuccessModal: boolean = false;
  public errorMessage: string | null = null;

  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Formulario de registro enviado:', this.registroForm.value);
      const tipo = this.esTecnico ? 'tecnico' : 'cliente';

      this.registroService.registrarUsuario(this.registroForm.value, tipo).subscribe({
        next: (response) => {
          console.log('Usuario registrado con éxito', response);
          this.successMessage = 'Registro exitoso';
          // Abrir el modal y forzar detección de cambios para que aparezca en el primer click
          this.showSuccessModal = true;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Error al registrar usuario', err);
          if (err.status === 400 && err.error?.error && Array.isArray(err.error.error)) {
            err.error.error.forEach((valError: any) => {
              const field = this.registroForm.get(valError.path);
              if (field) {
                field.setErrors({ serverError: valError.message });
                field.markAsTouched();
              }
            });
          } else {
            this.errorMessage = err.error?.message || 'Hubo un error al registrar el usuario';
          }
        }
      });
    } else {
      this.registroForm.markAllAsTouched();
    }
  }

  onBack() {
    this.router.navigate(['/login']);
  }

  onSuccessOk() {
    this.showSuccessModal = false;
    this.successMessage = null;
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    if (this.esTecnico) {
      // Si es técnico, eliminamos los controles de contraseña 
      // para que el formulario no los marque como inválidos al estar vacíos
      this.registroForm.removeControl('contraseña');
      this.registroForm.removeControl('confirmarContraseña');
    }
  }

  private fb = inject(FormBuilder);

  public registroForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellido: ['', [Validators.required]],
    mail: ['', [Validators.required, Validators.email]],
    cuil: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    contraseña: ['', [Validators.required, Validators.minLength(6)]],
    confirmarContraseña: ['', [Validators.required]],
  });
}