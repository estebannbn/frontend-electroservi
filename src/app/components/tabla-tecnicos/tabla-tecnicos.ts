import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { TablaTecnicosService, Usuario } from '../../services/tabla-tecnicos/tabla-tecnicos.service';

interface Tecnico extends Usuario {
  activo: boolean;
}

@Component({
  selector: 'app-tabla-tecnicos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-tecnicos.html',
  styleUrl: './tabla-tecnicos.css',
})
export class TablaTecnicos implements OnInit {
  private router = inject(Router);
  private location = inject(Location);
  private tablaTecnicosService = inject(TablaTecnicosService);

  tecnicos = signal<Tecnico[]>([]);
  cargando = signal(false);
  error = signal<string | null>(null);
  mostrarModal = signal(false);
  modalMensaje = signal('');

  ngOnInit(): void {
    this.cargarTecnicos();
  }

  cargarTecnicos(): void {
    this.cargando.set(true);
    this.error.set(null);
    this.tablaTecnicosService.obtenerTecnicos().subscribe({
      next: (data) => {
        const tecnicosConEstado = data.usuarios.map(u => ({
          ...u,
          activo: u.tecnico?.estado !== 'DESHABILITADO'
        }));
        this.tecnicos.set(tecnicosConEstado);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar técnicos:', err);
        this.error.set('Error al cargar los técnicos');
        this.cargando.set(false);
      }
    });
  }

  volverMenu() {
    this.router.navigate(['/admin']);
  }

  toggleEstado(tecnico: Tecnico) {
    const nuevoEstado = tecnico.activo ? 'DESHABILITADO' : 'DISPONIBLE';
    
    this.tablaTecnicosService.cambiarEstado(tecnico.id, nuevoEstado).subscribe({
      next: () => {
        this.tecnicos.set(
          this.tecnicos().map((t) => (t.id === tecnico.id ? { ...t, activo: !t.activo } : t))
        );
        
        if (nuevoEstado === 'DESHABILITADO') {
            this.modalMensaje.set('Técnico deshabilitado correctamente');
        } else {
            this.modalMensaje.set('Técnico habilitado correctamente');
        }
        this.mostrarModal.set(true);
      },
      error: (err) => {
        console.error('Error al cambiar estado:', err);
        alert('Hubo un error al cambiar el estado del técnico.');
      }
    });
  }

  cerrarModal() {
    this.mostrarModal.set(false);
  }
}
