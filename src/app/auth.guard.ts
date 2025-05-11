import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service'; // Asegúrate de tener un servicio de autenticación

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      console.log('Usuario autenticado. Redirigiendo a /native');
      this.router.navigate(['/native']); // Redirige si ya está autenticado
      return false;
    }
    console.log('Usuario NO autenticado. Permitido acceso a /login');
    return true;
  }
}
