import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
  state
} from '@angular/animations';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
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
    trigger('buttonAnim', [
      transition('* => *', [
        animate('200ms', keyframes([
          style({ transform: 'scale(1)' }),
          style({ transform: 'scale(0.96)' }),
          style({ transform: 'scale(1)' })
        ]))
      ])
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
    // ── NUEVO ──────────────────────────────────────────
    trigger('toastAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-6px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateX(-6px)' }))
      ])
    ])
    // ───────────────────────────────────────────────────
  ]
})
export class Registro {

  constructor(private authService: Auth, private router: Router) {}

  nombre: string = '';
  apellidos: string = '';
  email: string = '';
  contrasenna: string = '';
  confirmarContrasenna: string = '';
  mensajeExito: string = '';

  registerState: 'normal' | 'error' = 'normal';
  logoState: 'in' | 'out' = 'in';

  // ── NUEVO ───────────────────────────────────────────
  errores: { [key: string]: string } = {};
  // ────────────────────────────────────────────────────

  inputFocus: 'nombre' | 'apellidos' | 'email' | 'contrasenna' | 'confirmarContrasenna' | null = null;

  setFocus(field: any) {
    this.inputFocus = field;
  }

  clearFocus() {
    this.inputFocus = null;
  }

  limpiarError(campo: string): void {
    delete this.errores[campo];
  }

  triggerError(): void {
    this.registerState = 'error';
    setTimeout(() => { this.registerState = 'normal'; }, 10);
  }

  // ── NUEVO ───────────────────────────────────────────
  validarCampo(campo: string): void {
    const soloTexto = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'\-]+$/;

    switch (campo) {
      case 'nombre':
        if (!this.nombre)
          this.errores['nombre'] = 'El nombre es obligatorio';
        else if (!soloTexto.test(this.nombre))
          this.errores['nombre'] = 'Solo se permiten letras, sin números ni símbolos';
        else if (this.nombre.trim().length < 2)
          this.errores['nombre'] = 'Mínimo 2 caracteres';
        else
          delete this.errores['nombre'];
        break;

      case 'apellidos':
        if (!this.apellidos)
          this.errores['apellidos'] = 'Los apellidos son obligatorios';
        else if (!soloTexto.test(this.apellidos))
          this.errores['apellidos'] = 'Solo se permiten letras, sin números ni símbolos';
        else if (this.apellidos.trim().length < 2)
          this.errores['apellidos'] = 'Mínimo 2 caracteres';
        else
          delete this.errores['apellidos'];
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!this.email)
          this.errores['email'] = 'El correo es obligatorio';
        else if (!emailRegex.test(this.email))
          this.errores['email'] = 'Formato inválido (ej: usuario@dominio.com)';
        else
          delete this.errores['email'];
        break;

      case 'contrasenna':
        const errPass = this.validarContrasenna(this.contrasenna);
        if (errPass)
          this.errores['contrasenna'] = errPass;
        else
          delete this.errores['contrasenna'];
        // Revalidar confirmación si ya fue tocada
        if (this.confirmarContrasenna) this.validarCampo('confirmarContrasenna');
        break;

      case 'confirmarContrasenna':
        if (!this.confirmarContrasenna)
          this.errores['confirmarContrasenna'] = 'Confirma tu contraseña';
        else if (this.contrasenna !== this.confirmarContrasenna)
          this.errores['confirmarContrasenna'] = 'Las contraseñas no coinciden';
        else
          delete this.errores['confirmarContrasenna'];
        break;
    }
  }

  private validarContrasenna(pass: string): string {
    if (!pass) return 'La contraseña es obligatoria';
    if (pass.length < 8) return 'Mínimo 8 caracteres';
    if (pass.length > 64) return 'Máximo 64 caracteres';
    if (!/[A-Z]/.test(pass)) return 'Debe incluir al menos una mayúscula';
    if (!/[a-z]/.test(pass)) return 'Debe incluir al menos una minúscula';
    if (!/[0-9]/.test(pass)) return 'Debe incluir al menos un número';
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(pass))
      return 'Debe incluir al menos un carácter especial';
    if (/\s/.test(pass)) return 'No puede contener espacios';
    if (/(.)\1{2,}/.test(pass)) return 'No uses caracteres repetidos seguidos (ej: aaa, 111)';
    return '';
  }
  // ────────────────────────────────────────────────────

  register(): void {
    // Validar todos los campos antes de enviar
    ['nombre', 'apellidos', 'email', 'contrasenna', 'confirmarContrasenna']
      .forEach(c => this.validarCampo(c));

    if (Object.keys(this.errores).length > 0) {
      this.triggerError();
      return;
    }

    const usuario = {
      nombre: this.nombre.trim(),
      apellidos: this.apellidos.trim(),
      email: this.email.toLowerCase().trim(),
      password: this.contrasenna
    };

    const resultado = this.authService.registrarUsuario(usuario);

    if (!resultado.exito) {
      this.errores['email'] = resultado.mensaje;
      this.triggerError();
      return;
    }

    this.errores = {};
    this.mensajeExito = '¡Registro exitoso! Redirigiendo...';

    this.nombre = '';
    this.apellidos = '';
    this.email = '';
    this.contrasenna = '';
    this.confirmarContrasenna = '';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }
}

// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Auth } from '../services/auth';
// import { Router } from '@angular/router';

// import {
//   trigger,
//   transition,
//   style,
//   animate,
//   keyframes,
//   state
// } from '@angular/animations';

// @Component({
//   selector: 'app-registro',
//   standalone: true,
//   imports: [RouterModule, CommonModule, FormsModule],
//   templateUrl: './registro.html',
//   styleUrls: ['./registro.css'],
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

//     trigger('buttonAnim', [
//       transition('* => *', [
//         animate('200ms', keyframes([
//           style({ transform: 'scale(1)' }),
//           style({ transform: 'scale(0.96)' }),
//           style({ transform: 'scale(1)' })
//         ]))
//       ])
//     ]),

//     // Error shake
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
//     ])
//   ]
// })
// export class Registro {

//   constructor(private authService: Auth, private router: Router) {}

//   triggerError(): void {
//     this.registerState = 'error';
//     setTimeout(() => {
//       this.registerState = 'normal';
//     }, 10);
//   }

//   nombre: string = '';
//   apellidos: string = '';
//   email: string = '';
//   contrasenna: string = '';
//   confirmarContrasenna: string = '';
//   mensajeError: string = '';
//   mensajeExito: string = '';

//   registerState: 'normal' | 'error' = 'normal';

//   logoState: 'in' | 'out' = 'in';

//   inputFocus:
//   | 'nombre'
//   | 'apellidos'
//   | 'email'
//   | 'contrasenna'
//   | 'confirmarContrasenna'
//   | null = null;

//   setFocus(field: any) {
//     this.inputFocus = field;
//   }

//   clearFocus() {
//     this.inputFocus = null;
//   }

//   register(): void {

//     if (
//       !this.nombre ||
//       !this.apellidos ||
//       !this.email ||
//       !this.contrasenna ||
//       !this.confirmarContrasenna
//     ) {
//       this.mensajeError = 'Todos los campos son obligatorios';
//       this.triggerError();
//       return;
//     }

//     if (this.contrasenna.length < 7) {
//       this.mensajeError = 'La contraseña debe tener al menos 7 caracteres';
//       this.triggerError();
//       return;
//     }

//     if (!/[A-Z]/.test(this.contrasenna)) {
//       this.mensajeError = 'La contraseña debe tener al menos una letra mayúscula';
//       this.triggerError();
//       return;
//     }

//     if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.contrasenna)) {
//       this.mensajeError = 'La contraseña debe tener al menos un carácter especial';
//       this.triggerError();
//       return;
//     }

//     if (this.contrasenna !== this.confirmarContrasenna) {
//       this.mensajeError = 'Las contraseñas no coinciden';
//       this.triggerError();
//       return;
//     }

//     if (!this.email.includes('@') || !this.email.includes('.')) {
//       this.mensajeError = 'Correo electrónico inválido';
//       this.triggerError();
//       return;
//     }

//     const usuario = {
//       nombre: this.nombre,
//       apellidos: this.apellidos,
//       email: this.email,
//       password: this.contrasenna
//     };

//     const resultado = this.authService.registrarUsuario(usuario);

//     if (!resultado.exito) {
//       this.mensajeError = resultado.mensaje;
//       this.triggerError();
//       return;
//     }

//     this.mensajeError = '';
//     this.mensajeExito = '¡Registro exitoso! Redirigiendo...';

//     this.nombre = '';
//     this.apellidos = '';
//     this.email = '';
//     this.contrasenna = '';
//     this.confirmarContrasenna = '';

//     setTimeout(() => {
//       this.router.navigate(['/login']);
//     }, 3000);
//   }
// }