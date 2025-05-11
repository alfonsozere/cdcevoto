import { Component } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-native',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './native.component.html',
  styleUrls: ['./native.component.css']
})
export class NativeComponent {
  electores$: Observable<any[]>; // Variable para almacenar los datos

  constructor(private firestore: Firestore) { // Asegura que Firestore está bien inyectado
    const electoresRef = collection(this.firestore, 'electores'); // Referencia a la colección
    this.electores$ = collectionData(electoresRef); // Obtiene los datos en tiempo real
  }
}
