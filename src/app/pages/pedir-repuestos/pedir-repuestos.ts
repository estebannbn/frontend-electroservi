import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RepuestosService, Repuesto } from '../../services/repuestos/repuestos.service';
import { ListaServiciosService } from '../../services/lista-servicios/lista-servicios.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-pedir-repuestos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedir-repuestos.html',
  styleUrls: ['./pedir-repuestos.css']
})
export class PedirRepuestosComponent implements OnInit {
  items: Repuesto[] = [];
  busquedaItem = '';
  resultadosBusqueda: Repuesto[] = [];
  itemSeleccionadoBusqueda: Repuesto | null = null;
  cantidadSolicitar = 1;
  listaSolicitud: { item: Repuesto, cantidad: number, guardado?: boolean, editado?: boolean }[] = [];
  listaEliminados: number[] = [];
  showModal = false;
  enviando = false;
  servicioId: number | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private repuestosService = inject(RepuestosService);
  private listaServiciosService = inject(ListaServiciosService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.servicioId = parseInt(idParam, 10);
      this.cargarRepuestos();
      this.cargarServicio();
    } else {
      alert("No se encontró el ID del servicio.");
      this.location.back();
    }
  }

  cargarServicio() {
    this.listaServiciosService.obtenerServiciosBusqueda(this.servicioId!).subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          const servicio = res[0];
          if (servicio.itemsRepuesto) {
            this.listaSolicitud = servicio.itemsRepuesto.map((ir: any) => ({
              item: ir.repuesto,
              cantidad: ir.cantidadDeRepuesto,
              guardado: true
            }));
            this.cdr.detectChanges();
          }
        }
      },
      error: (err) => console.error('Error fetching servicio', err)
    });
  }

  cargarRepuestos() {
    this.repuestosService.obtenerRepuestos().subscribe({
      next: (data) => {
        this.items = data;
        this.resultadosBusqueda = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching repuestos', err)
    });
  }

  buscarItem() {
    if (!this.busquedaItem.trim()) {
      this.resultadosBusqueda = this.items;
    } else {
      const query = this.busquedaItem.toLowerCase();
      this.resultadosBusqueda = this.items.filter(m => m.nombre.toLowerCase().includes(query));
    }
  }

  agregarALista() {
    if (this.itemSeleccionadoBusqueda && this.cantidadSolicitar > 0) {

      const itemExistente = this.listaSolicitud.find(l => l.item.id === this.itemSeleccionadoBusqueda!.id);

      if (this.cantidadSolicitar > this.itemSeleccionadoBusqueda.cantidadActual) {
        alert(`No puedes solicitar más de ${this.itemSeleccionadoBusqueda.cantidadActual} unidades de este repuesto.`);
        return;
      }

      if (itemExistente) {
        itemExistente.cantidad = this.cantidadSolicitar;
        if (itemExistente.guardado) {
          itemExistente.editado = true;
        }
      } else {
        this.listaSolicitud.push({
          item: this.itemSeleccionadoBusqueda,
          cantidad: this.cantidadSolicitar
        });
      }

      this.itemSeleccionadoBusqueda = null;
      this.cantidadSolicitar = 1;
    }
  }

  eliminarDeLista(index: number) {
    const item = this.listaSolicitud[index];
    if (item.guardado) {
      this.listaEliminados.push(item.item.id!);
    }
    this.listaSolicitud.splice(index, 1);
  }

  enviarSolicitud() {
    this.enviando = true;

    const requests = [];

    // Agregar nuevos
    const nuevos = this.listaSolicitud.filter(req => !req.guardado);
    for (const req of nuevos) {
      requests.push(this.listaServiciosService.agregarRepuestoAServicio({
        cantidadDeRepuesto: req.cantidad,
        repuestoId: req.item.id!,
        servicioId: this.servicioId!
      }).pipe(catchError(e => of(null))));
    }

    // Editar existentes
    const editados = this.listaSolicitud.filter(req => req.guardado && req.editado);
    for (const req of editados) {
      requests.push(this.listaServiciosService.editarRepuestoDeServicio(this.servicioId!, req.item.id!, {
        cantidadDeRepuesto: req.cantidad,
        repuestoId: req.item.id!,
        servicioId: this.servicioId!
      }).pipe(catchError(e => of(null))));
    }

    // Eliminar quitados
    for (const repuestoId of this.listaEliminados) {
      requests.push(this.listaServiciosService.eliminarRepuestoDeServicio(this.servicioId!, repuestoId).pipe(catchError(e => of(null))));
    }

    if (requests.length === 0) {
      this.showModal = true;
      this.enviando = false;
      return;
    }

    forkJoin(requests).subscribe({
      next: () => {
        this.enviando = false;
        this.showModal = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.enviando = false;
        console.error('Error en forkJoin', err);
        alert('Ocurrió un error al enviar algunos repuestos.');
        this.cdr.detectChanges();
      }
    });
  }

  cerrarModal() {
    this.showModal = false;
    this.listaSolicitud = [];
    this.router.navigate(['/tecnicos/servicios', this.servicioId]);
  }

  onVolver() {
    this.location.back();
  }
}
