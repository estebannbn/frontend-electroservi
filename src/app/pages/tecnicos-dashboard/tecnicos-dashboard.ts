import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceTs } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-tecnicos-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './tecnicos-dashboard.html',
  styleUrl: './tecnicos-dashboard.css',
})
export class TecnicosDashboard implements OnInit {
  tecnicoNombre: string = '';

  constructor(private authService: AuthServiceTs, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.authService.checkSession().subscribe({
      next: (res) => {
        if (res.user && res.user.nombre) {
          this.tecnicoNombre = res.user.nombre;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Error fetching session', err);
      }
    });
  }

  goToServicios() {
    this.router.navigate(['/tecnicos/servicios']);
  }

  goToNotificaciones() {
    this.router.navigate(['/tecnicos/notificaciones']);
  }
}
