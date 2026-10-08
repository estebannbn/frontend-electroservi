import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PagoComponent } from '../../components/pago-component/pago-component';
import { TablaTecnicosService, Usuario } from '../../services/tabla-tecnicos/tabla-tecnicos.service';

@Component({
  selector: 'app-registrar-pago',
  imports: [PagoComponent, RouterLink],
  templateUrl: './registrar-pago.html',
  styleUrl: './registrar-pago.css',
})
export class RegistrarPago implements OnInit {
  tecnicos = signal<Usuario[]>([]);
  sueldoComun = signal<number>(42000);
  
  private tablaTecnicosService = inject(TablaTecnicosService);

  ngOnInit() {
    this.tablaTecnicosService.obtenerTecnicos().subscribe({
      next: (response) => {
        this.tecnicos.set(response.usuarios);
      },
      error: (error) => {
        console.error('Error al obtener técnicos', error);
      }
    });
  }
}
