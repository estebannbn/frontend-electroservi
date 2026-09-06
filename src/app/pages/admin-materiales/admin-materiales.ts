import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialesService, Material } from '../../services/materiales/materiales.service';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-materiales',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-materiales.html',
  styleUrls: ['./admin-materiales.css'],
})
export class AdminMateriales implements OnInit {
  materiales: Material[] = [];

  selectedMaterial: Material | null = null;
  isCreating = false;
  editModel = {
    nombre: '',
    precioVentaActual: 0,
    cantidadActual: 0,
    cantidadAlerta: 0,
  };

  private router = inject(Router);
  private materialesService = inject(MaterialesService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.cargarMateriales();
  }

  cargarMateriales() {
    this.materialesService.obtenerMateriales().subscribe({
      next: (data) => {
        this.materiales = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener materiales:', err);
      }
    });
  }

  iniciarCreacion() {
    this.selectedMaterial = null;
    this.isCreating = true;
    this.editModel = {
      nombre: '',
      precioVentaActual: 0,
      cantidadActual: 0,
      cantidadAlerta: 0,
    };
  }

  seleccionarMaterial(material: Material) {
    this.selectedMaterial = material;
    this.isCreating = false;
    this.editModel = {
      nombre: material.nombre,
      precioVentaActual: material.precioVentaActual,
      cantidadActual: material.cantidadActual,
      cantidadAlerta: material.cantidadAlerta || 0,
    };
  }

  aplicarCambios() {
    if (this.isCreating) {
      this.materialesService.crearMaterial(this.editModel).subscribe({
        next: () => {
          alert('Material creado exitosamente.');
          this.isCreating = false;
          this.cargarMateriales();
        },
        error: (err) => {
          console.error('Error al crear material:', err);
          alert('Ocurrió un error al crear el material.');
        }
      });
      return;
    }

    if (!this.selectedMaterial) {
      return;
    }

    this.selectedMaterial.nombre = this.editModel.nombre;
    this.selectedMaterial.precioVentaActual = this.editModel.precioVentaActual;
    this.selectedMaterial.cantidadActual = this.editModel.cantidadActual;
    this.selectedMaterial.cantidadAlerta = this.editModel.cantidadAlerta;
    this.selectedMaterial = null;
    alert('Los datos del material se aplicaron localmente.');
  }

  cancelarEdicion() {
    this.selectedMaterial = null;
    this.isCreating = false;
  }

  onVolver() {
    if (this.selectedMaterial || this.isCreating) {
      this.selectedMaterial = null;
      this.isCreating = false;
    } else {
      this.router.navigate(['/admin']);
    }
  }
}
