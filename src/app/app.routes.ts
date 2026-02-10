// import { Routes } from '@angular/router';
// import {Login} from './login/login';
// import { Registro } from './registro/registro';

// export const routes: Routes = [
//     {path: '', component: Login},
//     {path: 'Login', component: Login},
//     {path: 'Registro', component: Registro},
//     {path: '', redirectTo: 'registro', pathMatch: 'full'}    
    
// ];
import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Registro } from './registro/registro';
import { RecuperarContrasena } from './recuperar-contrasena/recuperar-contrasena'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'recuperar-contrasena', component: RecuperarContrasena }
];
