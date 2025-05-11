import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('assets/datos/users.json').pipe(
      catchError((error) => {
        console.error('Error loading usuarios.json:', error);
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }

  validateUser(email: string, password: string): Observable<boolean> {
    return this.getUsers().pipe(
      map((users) => {
        console.log('Usuarios obtenidos:', users);

        return users.some((user) => {
          console.log(
            `Comparando: ${user.email} === ${email} && ${user.password} === ${password}`
          );
          return user.email === email && user.password === password;
        });
      }),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of(false);
      })
    );
  }
}
