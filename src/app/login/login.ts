// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';


// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [RouterModule],
//   templateUrl: './login.html',
//   styleUrls: ['./login.css'],
// })
// export class Login {

// }

// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import {
//   trigger,
//   transition,
//   style,
//   animate,
//   keyframes
// } from '@angular/animations';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [RouterModule, CommonModule],
//   templateUrl: './login.html',
//   styleUrls: ['./login.css'],
//   animations: [

//     // Animación del formulario (entrada)
//     trigger('formAnim', [
//       transition(':enter', [
//         style({
//           opacity: 0,
//           transform: 'translateY(40px)'
//         }),
//         animate(
//           '600ms ease-out',
//           style({
//             opacity: 1,
//             transform: 'translateY(0)'
//           })
//         )
//       ])
//     ]),

//     // Animación del logo
//     // Animación del logo (entrada + breathing)
// trigger('logoAnim', [
//   transition(':enter', [
//     style({
//       opacity: 0,
//       transform: 'scale(0.85)'
//     }),
//     animate(
//       '700ms ease-out',
//       style({
//         opacity: 1,
//         transform: 'scale(1)'
//       })
//     )
//   ])
// ]),


//     // Animación del botón (micro rebote)
//     trigger('buttonAnim', [
//       transition('* => *', [
//         animate(
//           '200ms',
//           keyframes([
//             style({ transform: 'scale(1)' }),
//             style({ transform: 'scale(0.96)' }),
//             style({ transform: 'scale(1)' })
//           ])
//         )
//       ])
//     ]),

//     // Animación de error (shake)
//     trigger('errorAnim', [
//       transition('* => error', [
//         animate(
//           '400ms',
//           keyframes([
//             style({ transform: 'translateX(0)' }),
//             style({ transform: 'translateX(-10px)' }),
//             style({ transform: 'translateX(10px)' }),
//             style({ transform: 'translateX(-10px)' }),
//             style({ transform: 'translateX(0)' })
//           ])
//         )
//       ])
//     ])
//   ]
// })
// export class Login {

//   loginState: 'normal' | 'error' = 'normal';

//   login(): void {
//     // Simulación de error de login
//     this.loginState = 'error';

//     // Reset rápido para poder repetir la animación
//     setTimeout(() => {
//       this.loginState = 'normal';
//     }, 10);
//   }
// }

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  imports: [RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
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
    ])
  ]
})
export class Login {

  // Estado del login
  loginState: 'normal' | 'error' = 'normal';

  // Estado del logo
  logoState: 'in' | 'out' = 'in';

  // Input activo
  inputFocus: 'email' | 'password' | null = null;

  

  setFocus(field: 'email' | 'password') {
    this.inputFocus = field;
  }

  clearFocus() {
    this.inputFocus = null;
  }

  login(): void {
    // Simula error
    this.loginState = 'error';

    setTimeout(() => {
      this.loginState = 'normal';
    }, 10);
  }
}
