import { initializeApp } from 'firebase/app';
import { environment } from './environments/environment'; // 🔹 Importa la configuración corregida

export const firebaseApp = initializeApp(environment.firebase); // 🔥 Inicializa Firebase correctamente