// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-recuperar-contrasena',
//   standalone: true,
//   imports: [RouterModule],
//   templateUrl: './recuperar-contrasena.html',
//   styleUrl: './recuperar-contrasena.css',
// })
// export class RecuperarContrasena {

// }
// import { Component, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { Auth } from '../services/auth';
// import { FormsModule } from '@angular/forms';
// import {
//   trigger,
//   transition,
//   style,
//   animate,
//   keyframes,
//   state
// } from '@angular/animations';

// @Component({
//   selector: 'app-recuperar-contrasena',
//   standalone: true,
//   imports: [CommonModule, RouterModule, FormsModule],
//   templateUrl: './recuperar-contrasena.html',
//   styleUrls: ['./recuperar-contrasena.css'],
//   animations: [
//     trigger('formAnim', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'translateY(40px)' }),
//         animate('600ms ease-out',
//           style({ opacity: 1, transform: 'translateY(0)' })
//         )
//       ])
//     ]),
//     trigger('logoAnim', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'scale(0.9)' }),
//         animate('700ms ease-out',
//           style({ opacity: 1, transform: 'scale(1)' })
//         )
//       ])
//     ]),
//     trigger('logoBreathing', [
//       state('in', style({ transform: 'scale(1)' })),
//       state('out', style({ transform: 'scale(1.04)' })),
//       transition('in <=> out', animate('3s ease-in-out'))
//     ]),
//     trigger('inputAnim', [
//       state('inactive', style({
//         transform: 'scale(1)',
//         boxShadow: 'none'
//       })),
//       state('active', style({
//         transform: 'scale(1.02)',
//         boxShadow: '0 0 0 3px rgba(0, 86, 179, 0.25)'
//       })),
//       transition('inactive <=> active', animate('200ms ease-out'))
//     ]),
//     trigger('errorAnim', [
//       transition('* => error', [
//         animate('400ms', keyframes([
//           style({ transform: 'translateX(0)' }),
//           style({ transform: 'translateX(-10px)' }),
//           style({ transform: 'translateX(10px)' }),
//           style({ transform: 'translateX(-10px)' }),
//           style({ transform: 'translateX(0)' })
//         ]))
//       ])
//     ]),
//     trigger('fadeAnim', [
//       transition(':enter', [
//         style({ opacity: 0 }),
//         animate('800ms ease-out', style({ opacity: 1 }))
//       ])
//     ])
//   ]
// })
// export class RecuperarContrasena {

//   nombre: string = '';
//   correo: string = '';
//   nuevaContrasenna: string = '';
//   confirmarContrasenna: string = '';

//   mostrarCambio: boolean = false;
//   mensajeError: string = '';
//   mensajeExito: string = '';

//   inputFocus: 'nombre' | 'correo' | null = null;
//   logoState: 'in' | 'out' = 'in';
//   errorState: 'normal' | 'error' = 'normal';

//   constructor(private authService: Auth) {}

//   setFocus(field: 'nombre' | 'correo') {
//     this.inputFocus = field;
//   }

//   clearFocus() {
//     this.inputFocus = null;
//   }

//   triggerError(): void {
//     this.errorState = 'error';
//     setTimeout(() => {
//       this.errorState = 'normal';
//     }, 500);
//   }

//   verificarDatos(): void {
//     this.mensajeError = '';
    
//     if (!this.nombre || !this.correo) {
//       this.mensajeError = 'Todos los campos son obligatorios';
//       this.triggerError();
//       return;
//     }

//     const usuarios = this.authService.obtenerUsuarios();
//     const usuario = usuarios.find(
//       u => u.nombre === this.nombre && u.email === this.correo
//     );

//     if (!usuario) {
//       this.mensajeError = 'Datos incorrectos';
//       this.triggerError();
//       return;
//     }

//     this.mostrarCambio = true;
//     this.mensajeError = '';
//   }

//   cambiarContrasena(): void {
//     this.mensajeError = '';
//     this.errorState = 'normal';

//     if (!this.nuevaContrasenna || !this.confirmarContrasenna) {
//       this.mensajeError = 'Completa todos los campos';
//       this.triggerError();
//       return;
//     }

//     if (this.nuevaContrasenna !== this.confirmarContrasenna) {
//       this.mensajeError = 'Las contraseñas no coinciden';
//       this.triggerError();
//       return;
//     }

//     const usuarios = this.authService.obtenerUsuarios();
//     const index = usuarios.findIndex(
//       u => u.nombre === this.nombre && u.email === this.correo
//     );

//     if (index === -1) {
//       this.mensajeError = 'Error al actualizar';
//       this.triggerError();
//       return;
//     }

//     usuarios[index].password = this.nuevaContrasenna;
//     this.authService.guardarUsuarios(usuarios);

//     this.mensajeExito = 'Contraseña actualizada correctamente';
//     this.mensajeError = '';
//     this.nuevaContrasenna = '';
//     this.confirmarContrasenna = '';

//     setTimeout(() => {
//       this.mostrarCambio = false;
//     }, 1500);

//     setTimeout(() => {
//       this.nombre = '';
//       this.correo = '';
//     }, 2000);

//     setTimeout(() => {
//       this.mensajeExito = '';
//     }, 4000);
//   }
// }

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/auth';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
  state
} from '@angular/animations';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './recuperar-contrasena.html',
  styleUrls: ['./recuperar-contrasena.css'],
  animations: [
    trigger('formAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ]),
    trigger('logoAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('700ms ease-out',
          style({ opacity: 1, transform: 'scale(1)' })
        )
      ])
    ]),
    trigger('logoBreathing', [
      state('in', style({ transform: 'scale(1)' })),
      state('out', style({ transform: 'scale(1.04)' })),
      transition('in <=> out', animate('3s ease-in-out'))
    ]),
    trigger('inputAnim', [
      state('inactive', style({
        transform: 'scale(1)',
        boxShadow: 'none'
      })),
      state('active', style({
        transform: 'scale(1.02)',
        boxShadow: '0 0 0 3px rgba(0, 86, 179, 0.25)'
      })),
      transition('inactive <=> active', animate('200ms ease-out'))
    ]),
    trigger('errorAnim', [
      transition('* => error', [
        animate('400ms', keyframes([
          style({ transform: 'translateX(0)' }),
          style({ transform: 'translateX(-10px)' }),
          style({ transform: 'translateX(10px)' }),
          style({ transform: 'translateX(-10px)' }),
          style({ transform: 'translateX(0)' })
        ]))
      ])
    ]),
    trigger('fadeAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class RecuperarContrasena {

  nombre: string = '';
  correo: string = '';
  nuevaContrasenna: string = '';
  confirmarContrasenna: string = '';

  mostrarCambio: boolean = false;
  mensajeError: string = '';
  mensajeExito: string = '';

  inputFocus: 'nombre' | 'correo' | null = null;
  logoState: 'in' | 'out' = 'in';
  errorState: 'normal' | 'error' = 'normal';

  constructor(private authService: Auth, private router: Router) {}

  setFocus(field: 'nombre' | 'correo') {
    this.inputFocus = field;
  }

  clearFocus() {
    this.inputFocus = null;
  }

  triggerError(): void {
    this.errorState = 'error';
    setTimeout(() => {
      this.errorState = 'normal';
    }, 500);
  }

  verificarDatos(): void {
    this.mensajeError = '';
    
    if (!this.nombre || !this.correo) {
      this.mensajeError = 'Todos los campos son obligatorios';
      this.triggerError();
      return;
    }

    const usuarios = this.authService.obtenerUsuarios();
    const usuario = usuarios.find(
      u => u.nombre === this.nombre && u.email === this.correo
    );

    if (!usuario) {
      this.mensajeError = 'Datos incorrectos';
      this.triggerError();
      return;
    }

    this.mostrarCambio = true;
    this.mensajeError = '';
  }

  cambiarContrasena(): void {
    this.mensajeError = '';
    this.errorState = 'normal';

    if (!this.nuevaContrasenna || !this.confirmarContrasenna) {
      this.mensajeError = 'Completa todos los campos';
      this.triggerError();
      return;
    }

    if (this.nuevaContrasenna !== this.confirmarContrasenna) {
      this.mensajeError = 'Las contraseñas no coinciden';
      this.triggerError();
      return;
    }

    const usuarios = this.authService.obtenerUsuarios();
    const index = usuarios.findIndex(
      u => u.nombre === this.nombre && u.email === this.correo
    );

    if (index === -1) {
      this.mensajeError = 'Error al actualizar';
      this.triggerError();
      return;
    }

    usuarios[index].password = this.nuevaContrasenna;
    this.authService.guardarUsuarios(usuarios);

    this.mensajeExito = 'Contraseña actualizada correctamente. Redirigiendo...';
    this.mensajeError = '';
    this.nuevaContrasenna = '';
    this.confirmarContrasenna = '';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }
}
