import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ListaServiciosService } from '../../services/lista-servicios/lista-servicios.service';
import { Servicio } from '../../interfaces/servicio';

@Component({
  selector: 'app-lista-servicios-component',
  standalone: true,
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './lista-servicios-component.html',
  styleUrl: './lista-servicios-component.css'
})
export class ListaServiciosComponent implements OnInit {
  public servicios: Servicio[] = [];
  private serviciosService = inject(ListaServiciosService);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // Obtenemos el cliente logueado desde la sesión
    this.http.get<any>(`${environment.apiUrl}/usuario/auth`, { withCredentials: true }).subscribe({
      next: (userResponse) => {
        const clienteId = userResponse?.user?.id;
        
        if (clienteId) {
          this.serviciosService.obtenerServiciosCliente(clienteId).subscribe({
            next: (data) => {
              this.servicios = data;
              this.cdr.detectChanges(); // Forzamos la actualización de la vista
            },
            error: (err) => {
              console.error('Error al obtener servicios', err);
            }
          });
        } else {
          console.warn('No se pudo determinar el ID del cliente');
        }
      },
      error: (err) => {
        console.error('Error de autenticación al cargar servicios', err);
      }
    });
  }
}
