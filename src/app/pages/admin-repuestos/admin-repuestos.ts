import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RepuestosService, Repuesto } from '../../services/repuestos/repuestos.service';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-repuestos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-repuestos.html',
  styleUrls: ['./admin-repuestos.css']
})
export class AdminRepuestos implements OnInit {
  repuestos: Repuesto[] = [];

  selectedRepuesto: Repuesto | null = null;
  isCreating = false;

  editModel = {
    nombre: '',
    precioVentaActual: 0,
    cantidadActual: 0,
  };

  private router = inject(Router);
  private repuestosService = inject(RepuestosService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.cargarRepuestos();
  }

  cargarRepuestos() {
    this.repuestosService.obtenerRepuestos().subscribe({
      next: (data) => {
        this.repuestos = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener repuestos:', err);
      }
    });
  }

  iniciarCreacion() {
    this.selectedRepuesto = null;
    this.isCreating = true;
    this.editModel = {
      nombre: '',
      precioVentaActual: 0,
      cantidadActual: 0,
    };
  }

  seleccionarRepuesto(repuesto: Repuesto) {
    this.selectedRepuesto = repuesto;
    this.isCreating = false;
    this.editModel = {
      nombre: repuesto.nombre,
      precioVentaActual: repuesto.precioVentaActual,
      cantidadActual: repuesto.cantidadActual,
    };
  }

  aplicarCambios() {
    if (this.isCreating) {
      this.repuestosService.crearRepuesto(this.editModel).subscribe({
        next: () => {
          alert('Repuesto creado exitosamente.');
          this.isCreating = false;
          this.cargarRepuestos();
        },
        error: (err) => {
          console.error('Error al crear repuesto:', err);
          alert('Ocurrió un error al crear el repuesto.');
        }
      });
      return;
    }

    if (!this.selectedRepuesto || !this.selectedRepuesto.id) {
      return;
    }

    this.repuestosService.actualizarRepuesto(this.selectedRepuesto.id, this.editModel).subscribe({
      next: () => {
        alert('Repuesto actualizado exitosamente.');
        this.selectedRepuesto = null;
        this.cargarRepuestos();
      },
      error: (err) => {
        console.error('Error al actualizar repuesto:', err);
        alert('Ocurrió un error al actualizar el repuesto.');
      }
    });
  }

  cancelarEdicion() {
    this.selectedRepuesto = null;
    this.isCreating = false;
  }

  onVolver() {
    if (this.selectedRepuesto || this.isCreating) {
      this.selectedRepuesto = null;
      this.isCreating = false;
    } else {
      this.router.navigate(['/admin']);
    }
  }
}
