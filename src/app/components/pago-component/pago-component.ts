import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistrarPagoService } from '../../services/registrar-pago/registrar-pago.service';

@Component({
  selector: 'app-pago-component',
  imports: [FormsModule],
  templateUrl: './pago-component.html',
  styleUrl: './pago-component.css',
})
export class PagoComponent {
  @Input() nombreCompleto: string = '';
  @Input() email: string = '';
  @Input({ required: true }) tecnicoId!: number;

  private registrarPagoService = inject(RegistrarPagoService);

  montoPago: number | null = null;
  pagoRealizado: boolean = false;

  registrarPago() {
    if (this.montoPago !== null && this.montoPago > 0) {
      this.registrarPagoService.registrarPago({ monto: this.montoPago, tecnicoId: this.tecnicoId }).subscribe({
        next: () => {
          this.pagoRealizado = true;
        },
        error: (err) => {
          console.error("Error al registrar el pago", err);
          alert("Ocurrió un error al registrar el pago.");
        }
      });
    }
  }
}
