import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient ) { }

  getUsers(): Observable<any> {
    return this.http.get('assets/data/usuarios.json');
  }
  
  private usuarios = [
    { email: "usuario1@example.com", password: "clave123" },
    { email: "admin@example.com", password: "admin2025" }
  ];

  validarUsuario(email: string, password: string): boolean {
    return this.usuarios.some(user => user.email === email && user.password === password);
  }

}
