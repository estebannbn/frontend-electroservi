import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ListaServiciosService } from '../../services/lista-servicios/lista-servicios.service';

@Component({
  selector: 'app-finalizar-relevamiento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './finalizar-relevamiento.html',
  styleUrls: []
})
export class FinalizarRelevamientoComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listaServiciosService: ListaServiciosService
  ) { }

  comentario = '';
  enviando = false;
  errorMessage = '';

  volverAlMenuTecnico(): void {
    const servicioId = this.route.snapshot.paramMap.get('id');
    if (servicioId) {
      this.router.navigate(['/tecnicos/servicios', servicioId]);
    } else {
      this.router.navigate(['/tecnicos/servicios']);
    }
  }

  finalizarRelevamiento(): void {
    const servicioId = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(servicioId) || servicioId <= 0) {
      this.errorMessage = 'No se pudo identificar el servicio.';
      return;
    }

    this.enviando = true;
    this.errorMessage = '';
    this.listaServiciosService.finalizarServicio(servicioId, this.comentario.trim()).subscribe({
      next: () => {
        void this.router.navigate(['/tecnicos/servicios']);
      },
      error: (error: HttpErrorResponse) => {
        this.enviando = false;
        this.errorMessage = error.error?.error ?? 'No se pudo finalizar el relevamiento.';
      }
    });
  }
}
