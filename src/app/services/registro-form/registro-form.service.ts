import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro } from '../../interfaces/registro';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistroFormService {
  private apiUrl = `${environment.apiUrl}/usuario`;

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: Registro, tipo: 'cliente' | 'tecnico'): Observable<any> {
    // Exclude confirmarContraseña before sending to the backend
    const { confirmarContraseña, ...usuarioPayload } = usuario;

    return this.http.post(`${this.apiUrl}/${tipo}`, usuarioPayload);
  }
}

