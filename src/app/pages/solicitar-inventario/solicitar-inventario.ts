import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialesService } from '../../services/materiales/materiales.service';
import { RepuestosService } from '../../services/repuestos/repuestos.service';

interface InventarioItem {
  id?: number;
  nombre: string;
  cantidadActual: number;
  precioVentaActual: number;
}

@Component({
  selector: 'app-solicitar-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitar-inventario.html',
  styleUrls: ['./solicitar-inventario.css'],
})
export class SolicitarInventario implements OnInit {
  tipo: 'materiales' | 'repuestos' = 'materiales';
  
  items: InventarioItem[] = [];
  
  busquedaItem = '';
  resultadosBusqueda: InventarioItem[] = [];
  itemSeleccionadoBusqueda: InventarioItem | null = null;
  cantidadSolicitar = 1;
  listaSolicitud: { item: InventarioItem, cantidad: number }[] = [];
  showModal = false;

  private router = inject(Router);
  private location = inject(Location);
  private materialesService = inject(MaterialesService);
  private repuestosService = inject(RepuestosService);

  ngOnInit() {
    if (this.router.url.includes('repuestos')) {
      this.tipo = 'repuestos';
      this.cargarRepuestos();
    } else {
      this.tipo = 'materiales';
      this.cargarMateriales();
    }
  }

  cargarMateriales() {
    this.materialesService.obtenerMateriales().subscribe({
      next: (data) => {
        this.items = data;
        this.resultadosBusqueda = data;
      }
    });
  }

  cargarRepuestos() {
    this.repuestosService.obtenerRepuestos().subscribe({
      next: (data) => {
        this.items = data;
        this.resultadosBusqueda = data;
      }
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
      this.listaSolicitud.push({
        item: this.itemSeleccionadoBusqueda,
        cantidad: this.cantidadSolicitar
      });
      this.itemSeleccionadoBusqueda = null;
      this.cantidadSolicitar = 1;
    }
  }

  eliminarDeLista(index: number) {
    this.listaSolicitud.splice(index, 1);
  }

  enviarSolicitud() {
    if (this.listaSolicitud.length > 0) {
      this.showModal = true;
    }
  }

  cerrarModal() {
    this.showModal = false;
    this.listaSolicitud = [];
    this.router.navigate([`/admin/${this.tipo}`]);
  }

  onVolver() {
    this.location.back();
  }
}
