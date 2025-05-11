import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Asegúrate de importar Router
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {
    const auth = getAuth();

    setPersistence(auth, browserLocalPersistence) // 🔥 Mantiene la sesión activa incluso al recargar
      .then(() => console.log('✅ Sesión persistente activada'))
      .catch((error) =>
        console.error('⚠️ Error al establecer persistencia:', error)
      );
  }

  login(email: string, password: string) {
    const auth = getAuth();

    return setPersistence(auth, browserLocalPersistence) // 🔥 Establece persistencia antes de iniciar sesión
      .then(() => signInWithEmailAndPassword(auth, email, password))
      .then((userCredential) => {
        console.log(
          `✅ Usuario autenticado en Firebase: ${userCredential.user.email}`
        );
        return userCredential.user;
      })
      .catch((error) => {
        console.error('⚠️ Error en autenticación:', error);
        throw error;
      });
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    console.log('Estado de autenticación:', user); // 🔥 Depuración
    return user !== null; // ✅ Retorna `true` si el usuario está guardado
  }

  logout(): void {
    localStorage.removeItem('user'); // ✅ Borra el usuario de la sesión
    this.router.navigate(['/login']); // Redirige a login
  }
}
