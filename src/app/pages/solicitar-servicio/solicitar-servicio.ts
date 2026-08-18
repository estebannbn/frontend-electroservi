import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {
  SolicitarServicioService,
  tipoElectrodomestico,
} from '../../services/solicitar-servicio/solicitar-servicio';
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
  applianceTypes: string[] = Object.values(tipoElectrodomestico);
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
      },
      error: (error) => {
        console.error('Error al cargar electrodomésticos:', error);
      },
    });
  }

  onBack() {
    this.router.navigate(['/clientes']);
  }

  private parseDate(value: any): Date | undefined {
    if (!value) {
      return undefined;
    }

    if (value instanceof Date) {
      return value;
    }

    if ('year' in value && 'month' in value && 'day' in value) {
      return new Date(value.year, value.month - 1, value.day);
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      // obtener clienteId desde la sesión (cookie httpOnly) por medio del endpoint /usuario/auth
      this.solicitarServicio.getCurrentUser().subscribe({
        next: (user) => {
          const clienteId = user?.id;

          const servicio = {
            fechaLlegadaEstimada: this.parseDate(this.service.arrivalDate) || new Date(),
            comentario: '',
            tecnicoId: null,
            clienteId: clienteId,
            tipoTrabajoId: null,
            electrodomestico: {
              tipo: this.service.applianceType as tipoElectrodomestico,
              modelo: this.service.model,
              marca: this.service.brand,
            },
          };

          this.solicitarServicio.crearServicio(servicio).subscribe({
            next: () => {
              window.alert('Solicitud realizada con éxito');
              this.router.navigate(['/clientes']);
            },
            error: (error) => {
              console.error('Error al crear servicio:', error);
            },
          });
        },
        error: (err) => {
          console.error('No se pudo obtener usuario:', err);
        }
      });
    }
  }
}