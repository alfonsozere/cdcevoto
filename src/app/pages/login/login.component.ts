import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  user() {
    if (this.userService.validarUsuario(this.email, this.password)) {
      this.router.navigate(['/native']); // Redirige a Native
    } else {
      this.errorMessage = 'Credenciales inválidas. Intenta nuevamente.';
    }
  }

  ngOnInit() {
    document.querySelector(".toggle-password")?.addEventListener("click", function () {
      const passwordField = document.querySelector("#password-field") as HTMLInputElement;
      passwordField.type = passwordField.type === "password" ? "text" : "password";
    });
  }
}

