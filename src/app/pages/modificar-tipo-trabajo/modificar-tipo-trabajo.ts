import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TipoTrabajo {
  id: number;
  nombre: string;
  precio: number;
  porcentajeTecnico: number;
  porcentajeNegocio: number;
}

@Component({
  selector: 'app-modificar-tipo-trabajo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modificar-tipo-trabajo.html',
  styleUrls: ['./modificar-tipo-trabajo.css'],
})
export class ModificarTipoTrabajo {
  tipoTrabajos: TipoTrabajo[] = [
    { id: 1, nombre: 'general', precio: 5000, porcentajeTecnico: 90, porcentajeNegocio: 10 },
    { id: 2, nombre: 'cambio repuesto', precio: 9000, porcentajeTecnico: 65, porcentajeNegocio: 35 },
    { id: 3, nombre: 'cambio de materiales', precio: 8000, porcentajeTecnico: 70, porcentajeNegocio: 30 },
    { id: 4, nombre: 'cambio de gas', precio: 7000, porcentajeTecnico: 80, porcentajeNegocio: 20 },
  ];

  selectedTipoTrabajo: TipoTrabajo | null = null;
  editModel = {
    nombre: '',
    precio: 0,
    porcentajeTecnico: 0,
    porcentajeNegocio: 0,
  };

  seleccionarTipo(tipo: TipoTrabajo) {
    this.selectedTipoTrabajo = tipo;
    this.editModel = {
      nombre: tipo.nombre,
      precio: tipo.precio,
      porcentajeTecnico: tipo.porcentajeTecnico,
      porcentajeNegocio: tipo.porcentajeNegocio,
    };
  }

  aplicarCambios() {
    if (!this.selectedTipoTrabajo) {
      return;
    }

    this.selectedTipoTrabajo.nombre = this.editModel.nombre;
    this.selectedTipoTrabajo.precio = this.editModel.precio;
    this.selectedTipoTrabajo.porcentajeTecnico = this.editModel.porcentajeTecnico;
    this.selectedTipoTrabajo.porcentajeNegocio = this.editModel.porcentajeNegocio;
    this.selectedTipoTrabajo = null;
    alert('Los datos se aplicaron localmente.');
  }

  cancelarEdicion() {
    this.selectedTipoTrabajo = null;
  }

  onVolver() {
    window.history.back();
  }
}

