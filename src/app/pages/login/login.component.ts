import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  user() {
    console.log('Intentando redirigir a /native...');
    console.log('Valores ingresados:', this.email, this.password); // Verifica los datos antes de validar
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, ingresa un correo y una contraseña';
      return; // Detiene la ejecución si los valores están vacíos
    }

    this.userService.validateUser(this.email, this.password).subscribe(
      (isValid) => {
        console.log('Resultado de validación:', isValid);
        if (isValid) {
          this.router.navigate(['/native']);
        } else {
          this.errorMessage = 'Credenciales inválidas. Intenta nuevamente.';
        }
      },
      (error) => {
        console.error('Error al validar el usuario:', error);
        this.errorMessage = 'Ocurrió un error al validar el usuario.';
      }
    );
  }

  ngOnInit() {
    document
      .querySelector('.toggle-password')
      ?.addEventListener('click', function () {
        const passwordField = document.querySelector(
          '#password-field'
        ) as HTMLInputElement;
        passwordField.type =
          passwordField.type === 'password' ? 'text' : 'password';
      });
  }
}
