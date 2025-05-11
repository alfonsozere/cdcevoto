import { Component } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-native',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './native.component.html',
  styleUrls: ['./native.component.css'],
})
export class NativeComponent {
  electores$: Observable<any[]>; // Variable para almacenar los datos

  constructor(private firestore: Firestore, private router: Router) {
    // Asegura que Firestore está bien inyectado
    const electoresRef = collection(this.firestore, 'electores'); // Referencia a la colección
    this.electores$ = collectionData(electoresRef); // Obtiene los datos en tiempo real
  }

  registrarVoto(cedula: string) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error('⚠️ No hay usuario autenticado. Bloqueando actualización.');
      this.router.navigate(['/login']); // 🔥 Redirigir al login si no hay sesión activa
      return;
    }

    const electorDoc = doc(this.firestore, `electores/${cedula}`);

    updateDoc(electorDoc, { voto: 'Votó' })
      .then(() => console.log(`✅ Voto registrado para ${cedula}`))
      .catch((error) => console.error('⚠️ Error al registrar el voto:', error));
  }
}
