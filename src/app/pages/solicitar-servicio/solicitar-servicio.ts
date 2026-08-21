import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {
  SolicitarServicioService,
  tipoElectrodomestico,
} from '../../services/solicitar-servicio/solicitar-servicio';
import { Electrodomestico } from '../../interfaces/electrodomestico';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day.toString().padStart(2, '0') + this.DELIMITER + date.month.toString().padStart(2, '0') + this.DELIMITER + date.year
      : '';
  }
}

@Component({
  selector: 'app-solicitar-servicio',
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  templateUrl: './solicitar-servicio.html',
  styleUrls: ['./solicitar-servicio.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class SolicitarServicio implements OnInit {
  constructor(private router: Router, private solicitarServicio: SolicitarServicioService) { }

  electrodomesticos: Electrodomestico[] = [];
  applianceTypes: string[] = Object.values(tipoElectrodomestico);
  pedidoExitoso = false;

  minDate!: NgbDateStruct;
  maxDate!: NgbDateStruct;

  isDisabled = (date: NgbDateStruct) => {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6; // 0 = Domingo, 6 = Sábado
  };

  service = {
    arrivalDate: null as any,
    applianceType: '',
    brand: '',
    model: '',
  };

  ngOnInit() {
    this.loadElectrodomesticos();

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.minDate = {
      year: tomorrow.getFullYear(),
      month: tomorrow.getMonth() + 1,
      day: tomorrow.getDate()
    };

    const max = new Date(tomorrow);
    max.setDate(max.getDate() + 21);
    this.maxDate = {
      year: max.getFullYear(),
      month: max.getMonth() + 1,
      day: max.getDate()
    };
  }

  formatApplianceType(tipo: string): string {
    return tipo.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
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
          const clienteId = user?.user?.id;

          const servicio: any = {
            fechaLlegadaEstimada: this.parseDate(this.service.arrivalDate) || new Date(),
            comentario: '',
            clienteId: clienteId,
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