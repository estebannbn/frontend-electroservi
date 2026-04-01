import { Component } from '@angular/core';
import { TablaTecnicos } from '../../components/tabla-tecnicos/tabla-tecnicos';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-tecnicos',
  imports: [TablaTecnicos, RouterLink],
  templateUrl: './menu-tecnicos.html',
  styleUrl: './menu-tecnicos.css',
})
export class MenuTecnicos {
  modificarSueldo() {
    alert('Acción: Modificar sueldo común (pendiente implementación de lógica)');
  }

  registrarPagos() {
    alert('Acción: Registrar pagos (solo los primeros 10 días del mes)');
  }
}
