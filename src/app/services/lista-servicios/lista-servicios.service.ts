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
    let url = `${this.baseUrl}/servicio`;
    if (clienteId) {
      url += `?clienteId=${clienteId}`;
    }
    return this.http.get<Servicio[]>(url);
  }

  obtenerServiciosTecnico(tecnicoId: number): Observable<Servicio[]> {
    let url = `${this.baseUrl}/servicio?tecnicoId=${tecnicoId}`;
    return this.http.get<Servicio[]>(url);
  }

  obtenerServiciosBusqueda(id?: number, tecnicoEmail?: string): Observable<Servicio[]> {
    let url = `${this.baseUrl}/servicio?`;
    if (id) {
      url += `id=${id}&`;
    }
    if (tecnicoEmail) {
      url += `tecnicoEmail=${tecnicoEmail}`;
    }
    return this.http.get<Servicio[]>(url);
  }

  finalizarServicio(servicioId: number, comentario: string): Observable<{ servicio: Servicio }> {
    return this.http.put<{ servicio: Servicio }>(
      `${this.baseUrl}/servicio/${servicioId}/finalizar`,
      { comentario }
    );
  }

  agregarRepuestoAServicio(data: { cantidadDeRepuesto: number, repuestoId: number, servicioId: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/item-repuesto`, data);
  }

  editarRepuestoDeServicio(servicioId: number, repuestoId: number, data: { cantidadDeRepuesto: number, repuestoId: number, servicioId: number }): Observable<any> {
    return this.http.put(`${this.baseUrl}/item-repuesto/${servicioId}/${repuestoId}`, data);
  }

  eliminarRepuestoDeServicio(servicioId: number, repuestoId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/item-repuesto/${servicioId}/${repuestoId}`);
  }

  agregarMaterialAServicio(data: { cantidadDeMaterial: number, materialId: number, servicioId: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/item-material`, data);
  }

  editarMaterialDeServicio(servicioId: number, materialId: number, data: { cantidadDeMaterial: number, materialId: number, servicioId: number }): Observable<any> {
    return this.http.put(`${this.baseUrl}/item-material/${servicioId}/${materialId}`, data);
  }

  eliminarMaterialDeServicio(servicioId: number, materialId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/item-material/${servicioId}/${materialId}`);
  }
}
