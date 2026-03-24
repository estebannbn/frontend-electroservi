import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Servicio } from '../../interfaces/servicio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaServiciosService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  constructor() { }

  obtenerServiciosCliente(clienteId?: number): Observable<Servicio[]> {
    let url = `${this.baseUrl}/api/servicio`;
    if (clienteId) {
      url += `?clienteId=${clienteId}`;
    }
    return this.http.get<Servicio[]>(url);
  }
}
