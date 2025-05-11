import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NativeComponent } from './pages/native/native.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Esto carga automáticamente el login al inicio
  { path: 'login', component: LoginComponent }, // Protege la ruta de login
  { path: 'native', component: NativeComponent, canActivate: [AuthGuard] },
];
