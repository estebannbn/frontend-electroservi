import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar-component/navbar-component';
import { ListaServiciosComponent } from '../../components/lista-servicios-component/lista-servicios-component';

@Component({
  selector: 'app-clientes-dasbhoard',
  standalone: true,
  imports: [NavbarComponent, ListaServiciosComponent],
  templateUrl: './clientes-dasbhoard.html',
  styleUrl: './clientes-dasbhoard.css',
})
export class ClientesDasbhoard {
  constructor(private router: Router) {}

  navigateToSolicitarServicio() {
    this.router.navigate(['/clientes/solicitar-servicio']);
  }
}
