import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthServiceTs } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})

export class NavbarComponent {
  private router = inject(Router);
  private authService = inject(AuthServiceTs);
  private location = inject(Location);

  get isAuthRoute(): boolean {
    const url = this.router.url;
    return url.includes('/login') || url.includes('/registro');
  }

  goBack() {
    this.location.back();
  }

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
