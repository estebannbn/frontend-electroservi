import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceTs } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})

export class NavbarComponent {

  constructor(private router: Router, private authService: AuthServiceTs) { }

  modificarDatos() {
    this.router.navigate(['/clientes/editar-perfil']);
  }

  cerrarSesion() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión', err);
      }
    });
  }
}
