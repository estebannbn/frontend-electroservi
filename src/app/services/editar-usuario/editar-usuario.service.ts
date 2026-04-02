import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EditarUsuarioService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/usuario`;

  editarUsuario(id: number, datos: any) {
    return this.http.put(`${this.apiUrl}/${id}`, datos);
  }
}
