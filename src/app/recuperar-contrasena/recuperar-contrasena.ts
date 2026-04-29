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



// import { Component } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
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

//   constructor(private authService: Auth, private router: Router) {}

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

//     this.mensajeExito = 'Contraseña actualizada correctamente. Redirigiendo...';
//     this.mensajeError = '';
//     this.nuevaContrasenna = '';
//     this.confirmarContrasenna = '';

//     setTimeout(() => {
//       this.router.navigate(['/login']);
//     }, 3000);
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
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('logoAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('logoBreathing', [
      state('in', style({ transform: 'scale(1)' })),
      state('out', style({ transform: 'scale(1.04)' })),
      transition('in <=> out', animate('3s ease-in-out'))
    ]),
    trigger('inputAnim', [
      state('inactive', style({ transform: 'scale(1)', boxShadow: 'none' })),
      state('active', style({ transform: 'scale(1.02)', boxShadow: '0 0 0 3px rgba(0, 86, 179, 0.25)' })),
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
    ]),
    trigger('toastAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(10px)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(10px)' }))
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
  mensajeExito: string = '';

  errores: { [key: string]: string } = {};

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
    setTimeout(() => { this.errorState = 'normal'; }, 500);
  }

  limpiarError(campo: string): void {
    delete this.errores[campo];
  }

  verificarDatos(): void {
    this.errores = {};
    const soloTexto = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'\-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!this.nombre) {
      this.errores['nombre'] = 'El nombre es obligatorio';
    } else if (!soloTexto.test(this.nombre)) {
      this.errores['nombre'] = 'Solo se permiten letras, sin números ni símbolos';
    } else if (this.nombre.trim().length < 2) {
      this.errores['nombre'] = 'Mínimo 2 caracteres';
    }

    if (!this.correo) {
      this.errores['correo'] = 'El correo es obligatorio';
    } else if (!emailRegex.test(this.correo)) {
      this.errores['correo'] = 'Formato de correo inválido';
    }

    if (Object.keys(this.errores).length > 0) {
      this.triggerError();
      return;
    }

    const usuarios = this.authService.obtenerUsuarios();
    const usuarioPorNombre = usuarios.find(u => u.nombre === this.nombre);
    const usuarioPorCorreo = usuarios.find(u => u.email === this.correo);

    if (!usuarioPorNombre && !usuarioPorCorreo) {
      this.errores['nombre'] = 'Este nombre no está registrado';
      this.errores['correo'] = 'Este correo no está registrado';
      this.triggerError();
      return;
    }

    if (!usuarioPorNombre) {
      this.errores['nombre'] = 'Este nombre no está registrado';
      this.triggerError();
      return;
    }

    if (!usuarioPorCorreo) {
      this.errores['correo'] = 'Este correo no está registrado';
      this.triggerError();
      return;
    }

    const usuario = usuarios.find(u => u.nombre === this.nombre && u.email === this.correo);
    if (!usuario) {
      this.errores['nombre'] = 'El nombre y correo no coinciden';
      this.errores['correo'] = 'El nombre y correo no coinciden';
      this.triggerError();
      return;
    }

    this.mostrarCambio = true;
  }

  cambiarContrasena(): void {
    this.errores = {};

    if (!this.nuevaContrasenna) {
      this.errores['nuevaContrasenna'] = 'La contraseña es obligatoria';
    } else {
      const errPass = this.validarContrasenna(this.nuevaContrasenna);
      if (errPass) this.errores['nuevaContrasenna'] = errPass;
    }

    if (!this.confirmarContrasenna) {
      this.errores['confirmarContrasenna'] = 'Confirma tu contraseña';
    } else if (this.nuevaContrasenna !== this.confirmarContrasenna) {
      this.errores['confirmarContrasenna'] = 'Las contraseñas no coinciden';
    }

    if (Object.keys(this.errores).length > 0) {
      this.triggerError();
      return;
    }

    const usuarios = this.authService.obtenerUsuarios();
    const index = usuarios.findIndex(u => u.nombre === this.nombre && u.email === this.correo);

    if (index === -1) {
      this.errores['nuevaContrasenna'] = 'Error al actualizar, intenta de nuevo';
      this.triggerError();
      return;
    }

    usuarios[index].password = this.nuevaContrasenna;
    this.authService.guardarUsuarios(usuarios);

    this.mensajeExito = 'Contraseña actualizada correctamente. Redirigiendo...';
    this.nuevaContrasenna = '';
    this.confirmarContrasenna = '';

    setTimeout(() => { this.router.navigate(['/login']); }, 3000);
  }

  private validarContrasenna(pass: string): string {
    if (pass.length < 8) return 'Mínimo 8 caracteres';
    if (pass.length > 64) return 'Máximo 64 caracteres';
    if (!/[A-Z]/.test(pass)) return 'Debe incluir al menos una mayúscula';
    if (!/[a-z]/.test(pass)) return 'Debe incluir al menos una minúscula';
    if (!/[0-9]/.test(pass)) return 'Debe incluir al menos un número';
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(pass))
      return 'Debe incluir al menos un carácter especial';
    if (/\s/.test(pass)) return 'No puede contener espacios';
    if (/(.)\1{2,}/.test(pass)) return 'No uses caracteres repetidos seguidos';
    return '';
  }
}