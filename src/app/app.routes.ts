import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NativeComponent } from './pages/native/native.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'native', component: NativeComponent },
];
