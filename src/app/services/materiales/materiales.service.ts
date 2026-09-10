import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

export interface Material {
  id?: number;
  nombre: string;
  cantidadActual: number;
  precioVentaActual: number;
  cantidadAlerta: number;
}

@Injectable({
  providedIn: 'root',
})
export class MaterialesService {
  private apiUrl = environment.apiUrl + '/material';
  private http = inject(HttpClient);

  obtenerMateriales(): Observable<Material[]> {
    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };
    return this.http.get<Material[]>(this.apiUrl, { headers });
  }

  crearMaterial(material: Omit<Material, 'id'>): Observable<Material> {
    return this.http.post<Material>(this.apiUrl, material);
  }

  actualizarMaterial(id: number, material: Omit<Material, 'id'>): Observable<Material> {
    return this.http.put<Material>(`${this.apiUrl}/${id}`, material);
  }
}
