import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RepuestosService, Repuesto } from '../../services/repuestos/repuestos.service';

@Component({
  selector: 'app-admin-repuestos',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

    if (!this.selectedRepuesto) {
      return;
    }

    // Actualización local por ahora si no hay endpoint PUT
    this.selectedRepuesto.nombre = this.editModel.nombre;
    this.selectedRepuesto.precioVentaActual = this.editModel.precioVentaActual;
    this.selectedRepuesto.cantidadActual = this.editModel.cantidadActual;
    this.selectedRepuesto = null;
    alert('Los datos del repuesto se aplicaron localmente.');
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
