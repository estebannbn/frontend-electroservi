import { Component, OnInit, inject } from '@angular/core';
import { PagoComponent } from '../../components/pago-component/pago-component';
import { TablaTecnicosService, Usuario } from '../../services/tabla-tecnicos/tabla-tecnicos.service';

@Component({
  selector: 'app-registrar-pago',
  imports: [PagoComponent],
  templateUrl: './registrar-pago.html',
  styleUrl: './registrar-pago.css',
})
export class RegistrarPago implements OnInit {
  tecnicos: Usuario[] = [];
  
  private tablaTecnicosService = inject(TablaTecnicosService);

  ngOnInit() {
    this.tablaTecnicosService.obtenerTecnicos().subscribe({
      next: (response) => {
        this.tecnicos = response.usuarios;
      },
      error: (error) => {
        console.error('Error al obtener técnicos', error);
      }
    });
  }
}
