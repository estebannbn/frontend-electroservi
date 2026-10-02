import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListaServiciosService } from '../../services/lista-servicios/lista-servicios.service';
import { Servicio } from '../../interfaces/servicio';

@Component({
  selector: 'app-admin-servicio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-servicio.html',
  styleUrl: './admin-servicio.css',
})
export class AdminServicio {
  searchId: number | null = null;
  searchEmail: string = '';

  servicios: Servicio[] | null = null;
  hasSearched: boolean = false;

  private listaServiciosService = inject(ListaServiciosService);
  private cdr = inject(ChangeDetectorRef);

  buscarServicios() {
    this.listaServiciosService.obtenerServiciosBusqueda(this.searchId || undefined, this.searchEmail || undefined)
      .subscribe({
        next: (data) => {
          this.servicios = data;
          this.hasSearched = true;
          this.cdr.detectChanges(); // Forzar actualización de la vista
        },
        error: (error) => {
          console.error('Error fetching services', error);
          this.servicios = [];
          this.hasSearched = true;
          this.cdr.detectChanges(); // Forzar actualización de la vista
        }
      });
  }

  isEnCurso(estado: string | undefined): string {
    if (!estado) return 'no';
    const terminados = ['ENTREGADO', 'CANCELADO', 'PAGADO'];
    return terminados.includes(estado.toUpperCase()) ? 'no' : 'si';
  }
}
