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
import { RecuperarContrasena } from './recuperar-contrasena/recuperar-contrasena';
import { Inicio } from './inicio/inicio';
import { Resultados } from './resultados/resultados';
import { Estadisticas } from './estadisticas/estadisticas';
import { Equipos } from './equipos/equipos';
import { ReyDeportes } from './rey-deportes/rey-deportes';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'recuperar-contrasena', component: RecuperarContrasena },
  { path: 'inicio', component: Inicio},
  { path: 'resultados', component: Resultados},
  { path: 'estadistica', component: Estadisticas },
  { path: 'equipos', component: Equipos },
  { path: 'reyDeportes', component: ReyDeportes }
];
