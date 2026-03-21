import { Component } from '@angular/core';
import { RegistroFormComponent } from '../../components/registro-form/registro-form';

@Component({
  selector: 'app-registro-cliente',
  imports: [RegistroFormComponent],
  templateUrl: './registro-cliente.html',
  styleUrl: './registro-cliente.css',
})
export class RegistroCliente { }
