import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ListaServiciosService } from '../../services/lista-servicios/lista-servicios.service';
import { Servicio } from '../../interfaces/servicio';

@Component({
  selector: 'app-relevar-servicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [DatePipe],
  templateUrl: './relevar-servicio.html',
  styleUrl: './relevar-servicio.css'
})
export class RelevarServicio implements OnInit {
  servicioId: number | null = null;
  servicio: Servicio | null = null;
  errorMessage: string | null = null;

  private route = inject(ActivatedRoute);
  private listaServiciosService = inject(ListaServiciosService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.servicioId = parseInt(idParam, 10);
      this.cargarServicio();
    } else {
      this.errorMessage = "ID de servicio no válido.";
    }
  }

  cargarServicio() {
    if (this.servicioId) {
      this.listaServiciosService.obtenerServiciosBusqueda(this.servicioId).subscribe({
        next: (res) => {
          if (res && res.length > 0) {
            this.servicio = res[0];
          } else {
            this.errorMessage = "No se encontró el servicio.";
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching service details', err);
          this.errorMessage = "Error al cargar el servicio.";
          this.cdr.detectChanges();
        }
      });
    }
  }
}
