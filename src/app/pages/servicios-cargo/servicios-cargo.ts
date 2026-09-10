import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceTs } from '../../services/auth-service/auth.service';
import { ListaServiciosService } from '../../services/lista-servicios/lista-servicios.service';
import { Servicio } from '../../interfaces/servicio';

@Component({
  selector: 'app-servicios-cargo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios-cargo.html',
  styleUrl: './servicios-cargo.css'
})
export class ServiciosCargo implements OnInit {
  servicios: Servicio[] = [];

  constructor(
    private authService: AuthServiceTs,
    private listaServiciosService: ListaServiciosService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.checkSession().subscribe({
      next: (res) => {
        if (res.user && res.user.id) {
          this.obtenerServicios(res.user.id);
        }
      },
      error: (err) => console.error('Error fetching session', err)
    });
  }

  obtenerServicios(tecnicoId: number) {
    this.listaServiciosService.obtenerServiciosTecnico(tecnicoId).subscribe({
      next: (data) => {
        this.servicios = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching servicios', err)
    });
  }

  volver() {
    this.router.navigate(['/tecnicos']);
  }

  relevar(servicio: Servicio) {
    // Navigate to relevar or handle it
    console.log('Relevar', servicio.id);
  }
}
