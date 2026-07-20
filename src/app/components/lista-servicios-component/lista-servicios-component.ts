import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
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
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // Aquí puedes pasar el ID del cliente si lo tienes disponible en el Auth Service.
    // De momento traemos los servicios utilizando el token de la sesión o sin filtros duros de front,
    // asumiendo que el backend nos los puede filtrar libremente.
    this.serviciosService.obtenerServiciosCliente().subscribe({
      next: (data) => {
        this.servicios = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener servicios', err);
      }
    });
  }
}
