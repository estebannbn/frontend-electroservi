import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { TablaTecnicosService, Usuario } from '../../services/tabla-tecnicos/tabla-tecnicos';

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
  private location = inject(Location);
  private tablaTecnicosService = inject(TablaTecnicosService);

  tecnicos = signal<Tecnico[]>([]);
  cargando = signal(false);
  error = signal<string | null>(null);

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
          activo: u.activo !== false
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
    this.location.back();
  }

  toggleEstado(tecnico: Tecnico) {
    this.tecnicos.set(
      this.tecnicos().map((t) => (t.id === tecnico.id ? { ...t, activo: !t.activo } : t))
    );
  }

  crearNuevoTecnico() {
    alert('Acción: Crear nuevo técnico (pendiente implementación de formulario)');
  }

  modificarSueldo() {
    alert('Acción: Modificar sueldo común (pendiente implementación de lógica)');
  }

  registrarPagos() {
    alert('Acción: Registrar pagos (solo los primeros 10 días del mes)');
  }
}
