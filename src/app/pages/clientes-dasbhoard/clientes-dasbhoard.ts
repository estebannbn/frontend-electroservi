import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListaServiciosComponent } from '../../components/lista-servicios-component/lista-servicios-component';

@Component({
  selector: 'app-clientes-dasbhoard',
  standalone: true,
  imports: [ListaServiciosComponent],
  templateUrl: './clientes-dasbhoard.html',
  styleUrl: './clientes-dasbhoard.css',
})
export class ClientesDasbhoard {
  constructor(private router: Router) {}

  navigateToSolicitarServicio() {
    this.router.navigate(['/clientes/solicitar-servicio']);
  }
}
