import { Component } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
    const electorDoc = doc(this.firestore, `electores/${cedula}`);
    updateDoc(electorDoc, { voto: 'Votó' }) // 🔥 Actualiza Firestore
      .then(() => {
        console.log(`✅ Voto registrado para ${cedula}`);

        // 🔥 Actualiza el estado visual en la tabla sin esperar la recarga
        this.electores$ = this.electores$.pipe(
          map((electores) =>
            electores.map((e) =>
              e.cedula === cedula ? { ...e, voto: 'Votó' } : e
            )
          )
        );
      })
      .catch((error) => console.error('Error al registrar el voto:', error));
  }
}
