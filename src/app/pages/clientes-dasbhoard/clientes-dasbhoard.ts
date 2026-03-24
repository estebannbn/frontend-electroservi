import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar-component/navbar-component';
import { ListaServiciosComponent } from '../../components/lista-servicios-component/lista-servicios-component';

@Component({
  selector: 'app-clientes-dasbhoard',
  standalone: true,
  imports: [NavbarComponent, ListaServiciosComponent],
  templateUrl: './clientes-dasbhoard.html',
  styleUrl: './clientes-dasbhoard.css',
})
export class ClientesDasbhoard { }
