import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface Electrodomestico {
  tipo: 'HELADERA' | 'LAVARROPAS' | 'AIRE_ACONDICIONADO';
  modelo: string;
  marca: string;
  clienteId: number;
}

@Injectable({
  providedIn: 'root',
})
export class SolicitarServicioService {
  private apiUrl = `${environment.apiUrl}/electrodomestico`;

  constructor(private http: HttpClient) {}

  crearElectrodomestico(electrodomestico: Electrodomestico): Observable<any> {
    return this.http.post<any>(this.apiUrl, electrodomestico);
  }

  obtenerElectrodomesticos(): Observable<Electrodomestico[]> {
    return this.http.get<Electrodomestico[]>(this.apiUrl);
  }
}
