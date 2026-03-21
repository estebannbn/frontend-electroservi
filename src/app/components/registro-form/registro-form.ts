import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro-form.html',
  styleUrl: './registro-form.css'
})


export class RegistroFormComponent implements OnInit {
  @Input() esTecnico: boolean = false;

  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Formulario de registro enviado:', this.registroForm.value);
      // TODO: Conectar con un servicio
    } else {
      this.registroForm.markAllAsTouched();
    }
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