import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrarPagoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/pago`;

  registrarPago(pago: { monto: number; tecnicoId: number }): Observable<any> {
    return this.http.post(this.apiUrl, pago);
  }
}
