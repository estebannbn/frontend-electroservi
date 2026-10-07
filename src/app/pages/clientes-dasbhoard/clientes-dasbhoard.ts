import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ListaServiciosComponent } from '../../components/lista-servicios-component/lista-servicios-component';
import { AuthServiceTs } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-clientes-dasbhoard',
  standalone: true,
  imports: [ListaServiciosComponent],
  templateUrl: './clientes-dasbhoard.html',
  styleUrl: './clientes-dasbhoard.css',
})
export class ClientesDasbhoard implements OnInit {
  nombreCliente = '';

  constructor(
    private router: Router,
    private authService: AuthServiceTs,
    private location: Location
  ) {
    const navigationState = this.location.getState() as { nombreCliente?: string };
    this.nombreCliente = navigationState.nombreCliente?.trim() ?? '';
  }

  ngOnInit(): void {
    this.authService.checkSession().subscribe({
      next: (response) => {
        const nombre = response?.user?.nombre;
        if (typeof nombre === 'string' && nombre.trim()) {
          this.nombreCliente = nombre.trim();
        }
      },
      error: (error) => console.error('No se pudo cargar el nombre del cliente', error)
    });
  }

  navigateToSolicitarServicio() {
    this.router.navigate(['/clientes/solicitar-servicio']);
  }
}
