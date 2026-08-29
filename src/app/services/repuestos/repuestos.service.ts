import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

export interface Repuesto {
  id?: number;
  nombre: string;
  cantidadActual: number;
  precioVentaActual: number;
}

@Injectable({
  providedIn: 'root'
})
export class RepuestosService {
  private apiUrl = environment.apiUrl + '/repuesto';
  private http = inject(HttpClient);

  obtenerRepuestos(): Observable<Repuesto[]> {
    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };
    return this.http.get<Repuesto[]>(this.apiUrl, { headers });
  }

  crearRepuesto(repuesto: Omit<Repuesto, 'id'>): Observable<Repuesto> {
    return this.http.post<Repuesto>(this.apiUrl, repuesto);
  }
}
