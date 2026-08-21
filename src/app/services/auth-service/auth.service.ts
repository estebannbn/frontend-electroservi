import { Injectable } from '@angular/core';
import { LoginInput } from '../../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceTs {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(loginData: LoginInput) {
    return this.http.post<any>(`${this.baseUrl}/usuario/login`, loginData);
  }

  logout() {
    return this.http.post<any>(`${this.baseUrl}/usuario/logout`, {});
  }

  checkSession() {
    return this.http.get<any>(`${this.baseUrl}/usuario/auth`);
  }
}
