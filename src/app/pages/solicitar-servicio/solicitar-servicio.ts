import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SolicitarServicioService } from '../../services/solicitar-servicio/solicitar-servicio';
import { Electrodomestico } from '../../interfaces/electrodomestico';

@Component({
  selector: 'app-solicitar-servicio',
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  templateUrl: './solicitar-servicio.html',
  styleUrls: ['./solicitar-servicio.css'],
})
export class SolicitarServicio implements OnInit {
  constructor(private router: Router, private solicitarServicio: SolicitarServicioService) {}

  electrodomesticos: Electrodomestico[] = [];
  applianceTypes: string[] = [];
  brands: string[] = [];
  modelsByBrand: Record<string, string[]> = {};
  selectedModels: string[] = [];
  pedidoExitoso = false;

  service = {
    arrivalDate: null as any,
    applianceType: '',
    brand: '',
    model: '',
  };

  ngOnInit() {
    this.loadElectrodomesticos();
  }

  loadElectrodomesticos() {
    this.solicitarServicio.obtenerElectrodomesticos().subscribe({
      next: (electrodomesticos) => {
        this.electrodomesticos = electrodomesticos;
        this.applianceTypes = Array.from(new Set(electrodomesticos.map((item) => item.tipo)));
        this.brands = Array.from(new Set(electrodomesticos.map((item) => item.marca)));
        this.modelsByBrand = electrodomesticos.reduce((acc, item) => {
          if (!acc[item.marca]) {
            acc[item.marca] = [];
          }
          if (!acc[item.marca].includes(item.modelo)) {
            acc[item.marca].push(item.modelo);
          }
          return acc;
        }, {} as Record<string, string[]>);
      },
      error: (error) => {
        console.error('Error al cargar electrodomésticos:', error);
      },
    });
  }

  onBrandChange() {
    this.selectedModels = this.modelsByBrand[this.service.brand] || [];
    this.service.model = '';
  }

  onBack() {
    this.router.navigate(['/clientes']);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const electrodomestico = {
        tipo: this.service.applianceType as 'HELADERA' | 'LAVARROPAS' | 'AIRE_ACONDICIONADO',
        modelo: this.service.model,
        marca: this.service.brand,
        clienteId: 1,
      };

      this.solicitarServicio.crearElectrodomestico(electrodomestico).subscribe({
        next: () => {
          this.pedidoExitoso = true;
        },
        error: (error) => {
          console.error('Error al crear electrodoméstico:', error);
        },
      });
    }
  }
}