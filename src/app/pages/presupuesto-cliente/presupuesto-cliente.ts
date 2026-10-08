import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaServiciosService } from '../../services/lista-servicios/lista-servicios.service';
import { Servicio } from '../../interfaces/servicio';
import { ItemDeMaterial } from '../../interfaces/material';
import { ItemDeRepuesto } from '../../interfaces/repuesto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-presupuesto-cliente',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './presupuesto-cliente.html',
  styleUrl: './presupuesto-cliente.css'
})
export class PresupuestoCliente implements OnInit {
  servicio?: Servicio;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private serviciosService = inject(ListaServiciosService);
  private cdr = inject(ChangeDetectorRef);

  precioDiagnostico: number = 15000;
  precioTipoTrabajo: number = 0;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.serviciosService.obtenerServiciosBusqueda(Number(id)).subscribe({
        next: (res) => {
          if (res && res.length > 0) {
            this.servicio = res[0];
            this.precioTipoTrabajo = this.servicio.tipoTrabajo?.precio || 5000;
            this.cdr.detectChanges();
          } else {
            console.warn("No se encontró el servicio con id", id);
          }
        },
        error: (err) => {
          console.error('Error al obtener servicio:', err);
        }
      });
    }
  }

  formatApplianceName(tipo: string | undefined): string {
    if (!tipo) return 'electrodoméstico';
    const nombre = tipo.replace(/_/g, ' ').toLowerCase();
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
  }

  getRepuestoPrice(item: ItemDeRepuesto): number {
    return item.repuesto?.precioVentaActual || 0;
  }

  getMaterialPrice(item: ItemDeMaterial): number {
    return (item.material?.precioVentaActual || 0) * (item.cantidadDeMaterial || 0);
  }

  mostrarModal = false;
  mensajeModal = '';
  procesando = false;

  getPrecioEstimado(): number {
    let totalRepuestos = 0;
    this.servicio?.itemsRepuesto?.forEach(r => {
      totalRepuestos += (this.getRepuestoPrice(r) * (r.cantidadDeRepuesto || 0));
    });

    let totalMateriales = 0;
    this.servicio?.itemsMaterial?.forEach(m => {
      totalMateriales += this.getMaterialPrice(m);
    });

    return this.precioDiagnostico + this.precioTipoTrabajo + totalRepuestos + totalMateriales;
  }

  cambiarEstado(estado: string, mensajeExito: string) {
    if (!this.servicio?.id) return;

    this.procesando = true;
    this.serviciosService.cambiarEstadoServicio(this.servicio.id, estado).subscribe({
      next: () => {
        this.procesando = false;
        this.mensajeModal = mensajeExito;
        this.mostrarModal = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.procesando = false;
        console.error('Error al cambiar el estado', err);
        alert('Hubo un error al procesar tu solicitud.');
      }
    });
  }

  aceptarSoloDiagnostico() {
    this.cambiarEstado('CANCELADO', 'Has aceptado solo el diagnóstico. El servicio ha sido cancelado y se cobrará únicamente la revisión.');
  }

  aceptarServicioCompleto() {
    this.cambiarEstado('EN_REPARACION', 'Has aceptado el servicio completo. El electrodoméstico pasará a reparación en breve.');
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.router.navigate(['/clientes']);
  }
}
