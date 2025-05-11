import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service'; // Asegúrate de tener un servicio de autenticación
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      const auth = getAuth();

      if (this.isLoggedIn()) {
        // ✅ Primero verifica la autenticación sin esperar eventos asíncronos
        console.log('✅ Usuario autenticado. Bloqueando acceso a /login.');
        this.router.navigate(['/native']);
        resolve(false);
        return;
      }

      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('⚠️ Usuario autenticado. Redirigiendo a /native.');
          this.router.navigate(['/native']);
          resolve(false);
        } else {
          console.log('✅ Usuario NO autenticado. Permitido acceso a /login');
          resolve(true);
        }
      });
    });
  }

  isLoggedIn(): boolean {
    const auth = getAuth();
    let isAuthenticated = false;

    onAuthStateChanged(auth, (user) => {
      isAuthenticated = !!user; // ✅ Solo devuelve `true` si hay usuario autenticado
    });

    return isAuthenticated;
  }
}
