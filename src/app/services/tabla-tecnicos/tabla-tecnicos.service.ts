import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  mail: string;
  cuil: string;
  telefono: string;
  direccion: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TablaTecnicosService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/usuario`;

  obtenerTecnicos(): Observable<{ usuarios: Usuario[] }> {
    return this.http.get<{ usuarios: Usuario[] }>(`${this.apiUrl}?tipo=tecnico`);
  }
}
