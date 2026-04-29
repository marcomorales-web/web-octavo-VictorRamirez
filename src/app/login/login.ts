import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
  state
} from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
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
export class Login {

  constructor(private authService: Auth, private router: Router) {}

  email: string = '';
  contrasenna: string = '';

  loginState: 'normal' | 'error' = 'normal';
  logoState: 'in' | 'out' = 'in';

  errores: { [key: string]: string } = {};

  inputFocus: 'email' | 'password' | null = null;

  setFocus(field: 'email' | 'password') {
    this.inputFocus = field;
  }

  clearFocus() {
    this.inputFocus = null;
  }

  triggerError(): void {
    this.loginState = 'error';
    setTimeout(() => { this.loginState = 'normal'; }, 10);
  }

  limpiarError(campo: string): void {
    delete this.errores[campo];
  }

  login(): void {
    this.errores = {};

    if (!this.email) {
      this.errores['email'] = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(this.email)) {
      this.errores['email'] = 'Formato de correo inválido';
    }

    if (!this.contrasenna) {
      this.errores['contrasenna'] = 'La contraseña es obligatoria';
    }

    if (Object.keys(this.errores).length > 0) {
      this.triggerError();
      return;
    }

    const resultado = this.authService.iniciarSesion(this.email, this.contrasenna);

    if (!resultado.exito) {
      if (resultado.campo === 'ambos') {
        this.errores['email'] = 'Este correo no está registrado';
        this.errores['contrasenna'] = 'Contraseña incorrecta';
      } else {
        this.errores[resultado.campo!] = resultado.mensaje;
      }
      this.triggerError();
      return;
    }

    this.errores = {};
    this.email = '';
    this.contrasenna = '';
    this.router.navigate(['/inicio']);
  }
}

// import { Component } from '@angular/core';
// import { RouterModule, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Auth } from '../services/auth';
// import {
//   trigger,
//   transition,
//   style,
//   animate,
//   keyframes,
//   state
// } from '@angular/animations';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [RouterModule, CommonModule, FormsModule],
//   templateUrl: './login.html',
//   styleUrls: ['./login.css'],
//   animations: [
//     trigger('formAnim', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'translateY(40px)' }),
//         animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
//       ])
//     ]),
//     trigger('logoAnim', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'scale(0.9)' }),
//         animate('700ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
//       ])
//     ]),
//     trigger('logoBreathing', [
//       state('in', style({ transform: 'scale(1)' })),
//       state('out', style({ transform: 'scale(1.04)' })),
//       transition('in <=> out', animate('3s ease-in-out'))
//     ]),
//     trigger('inputAnim', [
//       state('inactive', style({ transform: 'scale(1)', boxShadow: 'none' })),
//       state('active', style({ transform: 'scale(1.02)', boxShadow: '0 0 0 3px rgba(0, 86, 179, 0.25)' })),
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
//     trigger('toastAnim', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'translateX(10px)' }),
//         animate('250ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
//       ]),
//       transition(':leave', [
//         animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(10px)' }))
//       ])
//     ])
//   ]
// })
// export class Login {

//   constructor(private authService: Auth, private router: Router) {}

//   email: string = '';
//   contrasenna: string = '';

//   loginState: 'normal' | 'error' = 'normal';
//   logoState: 'in' | 'out' = 'in';

//   errores: { [key: string]: string } = {};

//   inputFocus: 'email' | 'password' | null = null;

//   setFocus(field: 'email' | 'password') {
//     this.inputFocus = field;
//   }

//   clearFocus() {
//     this.inputFocus = null;
//   }

//   triggerError(): void {
//     this.loginState = 'error';
//     setTimeout(() => { this.loginState = 'normal'; }, 10);
//   }

//   limpiarError(campo: string): void {
//     delete this.errores[campo];
//   }

//   login(): void {
//     this.errores = {};

//     if (!this.email) {
//       this.errores['email'] = 'El correo es obligatorio';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(this.email)) {
//       this.errores['email'] = 'Formato de correo inválido';
//     }

//     if (!this.contrasenna) {
//       this.errores['contrasenna'] = 'La contraseña es obligatoria';
//     }

//     if (Object.keys(this.errores).length > 0) {
//       this.triggerError();
//       return;
//     }

//     const resultado = this.authService.iniciarSesion(this.email, this.contrasenna);

//     if (!resultado.exito) {
//       this.errores[resultado.campo!] = resultado.mensaje;
//       this.triggerError();
//       return;
//     }

//     this.errores = {};
//     this.email = '';
//     this.contrasenna = '';
//     this.router.navigate(['/inicio']);
//   }
// }

// import { Component } from '@angular/core';
// import { RouterModule, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Auth } from '../services/auth';
// import {
//   trigger,
//   transition,
//   style,
//   animate,
//   keyframes,
//   state
// } from '@angular/animations';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [RouterModule, CommonModule, FormsModule],
//   templateUrl: './login.html',
//   styleUrls: ['./login.css'],
//   animations: [
//     trigger('formAnim', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'translateY(40px)' }),
//         animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
//       ])
//     ]),
//     trigger('logoAnim', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'scale(0.9)' }),
//         animate('700ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
//       ])
//     ]),
//     trigger('logoBreathing', [
//       state('in', style({ transform: 'scale(1)' })),
//       state('out', style({ transform: 'scale(1.04)' })),
//       transition('in <=> out', animate('3s ease-in-out'))
//     ]),
//     trigger('inputAnim', [
//       state('inactive', style({ transform: 'scale(1)', boxShadow: 'none' })),
//       state('active', style({ transform: 'scale(1.02)', boxShadow: '0 0 0 3px rgba(0, 86, 179, 0.25)' })),
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
//     trigger('toastAnim', [
//       transition(':enter', [
//         style({ opacity: 0, transform: 'translateX(10px)' }),
//         animate('250ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
//       ]),
//       transition(':leave', [
//         animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(10px)' }))
//       ])
//     ])
//   ]
// })
// export class Login {

//   constructor(private authService: Auth, private router: Router) {}

//   email: string = '';
//   contrasenna: string = '';

//   loginState: 'normal' | 'error' = 'normal';
//   logoState: 'in' | 'out' = 'in';

//   errores: { [key: string]: string } = {};

//   inputFocus: 'email' | 'password' | null = null;

//   setFocus(field: 'email' | 'password') {
//     this.inputFocus = field;
//   }

//   clearFocus() {
//     this.inputFocus = null;
//   }

//   triggerError(): void {
//     this.loginState = 'error';
//     setTimeout(() => { this.loginState = 'normal'; }, 10);
//   }

//   limpiarError(campo: string): void {
//     delete this.errores[campo];
//   }

//   login(): void {
//     this.errores = {};

//     if (!this.email) {
//       this.errores['email'] = 'El correo es obligatorio';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(this.email)) {
//       this.errores['email'] = 'Formato de correo inválido';
//     }

//     if (!this.contrasenna) {
//       this.errores['contrasenna'] = 'La contraseña es obligatoria';
//     }

//     if (Object.keys(this.errores).length > 0) {
//       this.triggerError();
//       return;
//     }

//     const resultado = this.authService.iniciarSesion(this.email, this.contrasenna);

//     if (!resultado.exito) {
//       this.errores['email'] = resultado.mensaje;
//       this.errores['contrasenna'] = resultado.mensaje;
//       this.triggerError();
//       return;
//     }

//     this.errores = {};
//     this.email = '';
//     this.contrasenna = '';
//     this.router.navigate(['/inicio']);
//   }
// }


// import { Component } from '@angular/core';
// import { RouterModule, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Auth } from '../services/auth';
// import {
//   trigger,
//   transition,
//   style,
//   animate,
//   keyframes,
//   state
// } from '@angular/animations';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [RouterModule, CommonModule, FormsModule],
//   templateUrl: './login.html',
//   styleUrls: ['./login.css'],
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
// export class Login {

//   constructor(
//     private authService: Auth,
//     private router: Router
//   ) {}

//   email: string = '';
//   contrasenna: string = '';
//   mensajeError: string = '';

//   loginState: 'normal' | 'error' = 'normal';
//   logoState: 'in' | 'out' = 'in';

//   inputFocus: 'email' | 'password' | null = null;

//   setFocus(field: 'email' | 'password') {
//     this.inputFocus = field;
//   }

//   clearFocus() {
//     this.inputFocus = null;
//   }

//   triggerError(): void {
//     this.loginState = 'error';
//     setTimeout(() => {
//       this.loginState = 'normal';
//     }, 10);
//   }

//   login(): void {

//     if (!this.email || !this.contrasenna) {
//       this.mensajeError = 'Todos los campos son obligatorios';
//       this.triggerError();
//       return;
//     }

//     const resultado = this.authService.iniciarSesion(this.email, this.contrasenna);

//     if (!resultado.exito) {
//       this.mensajeError = resultado.mensaje;
//       this.triggerError();
//       return;
//     }

//     this.mensajeError = '';

//     this.email = '';
//     this.contrasenna = '';

//     this.router.navigate(['/inicio']);
//   }
// }