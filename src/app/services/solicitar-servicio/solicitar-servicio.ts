import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export enum tipoElectrodomestico {
  HELADERA = 'HELADERA',
  LAVARROPAS = 'LAVARROPAS',
  AIRE_ACONDICIONADO = 'AIRE_ACONDICIONADO',
}

export interface Electrodomestico {
  tipo: tipoElectrodomestico;
  modelo: string;
  marca: string;
  clienteId: number;
}

@Injectable({
  providedIn: 'root',
})
export class SolicitarServicioService {
  private apiUrl = `${environment.apiUrl}/electrodomestico`;

  constructor(private http: HttpClient) { }

  crearElectrodomestico(electrodomestico: Electrodomestico): Observable<any> {
    return this.http.post<any>(this.apiUrl, electrodomestico);
  }

  obtenerElectrodomesticos(): Observable<Electrodomestico[]> {
    return this.http.get<Electrodomestico[]>(this.apiUrl);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/usuario/auth`, { withCredentials: true });
  }
  crearServicio(servicio: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/servicio`, servicio);
  }
}
