import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ListaServiciosService } from '../../services/lista-servicios/lista-servicios.service';
import { Servicio } from '../../interfaces/servicio';

@Component({
  selector: 'app-notificaciones-cliente',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './notificaciones-cliente.html',
  styleUrl: './notificaciones-cliente.css'
})
export class NotificacionesCliente implements OnInit {
  public notificaciones: Servicio[] = [];
  private serviciosService = inject(ListaServiciosService);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  formatApplianceName(tipo: string | undefined): string {
    if (!tipo) return 'N/A';
    const nombre = tipo.replace(/_/g, ' ').toLowerCase();
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
  }

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/usuario/auth`, { withCredentials: true }).subscribe({
      next: (userResponse) => {
        const clienteId = userResponse?.user?.id;

        if (clienteId) {
          this.serviciosService.obtenerServiciosCliente(clienteId).subscribe({
            next: (data) => {
              this.notificaciones = data.filter(s => s.estado === 'DIAGNOSTICADO' || s.estado === 'REPARADO');
              this.cdr.detectChanges();
            },
            error: (err) => console.error('Error al obtener servicios', err)
          });
        }
      },
      error: (err) => console.error('Error de autenticación', err)
    });
  }
}
