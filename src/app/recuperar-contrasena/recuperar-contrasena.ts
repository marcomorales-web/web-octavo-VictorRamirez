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
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
export class RecuperarContrasena{

  inputFocus: 'nombre' | 'correo' | null = null;

  logoState: 'in' | 'out' = 'in';

  errorState: 'normal' | 'error' = 'normal';

  setFocus(field: 'nombre' | 'correo') {
    this.inputFocus = field;
  }

  clearFocus() {
    this.inputFocus = null;
  }

  verificarDatos(): void {
  if (!this.inputFocus) {
    this.errorState = 'error';
    setTimeout(() => {
      this.errorState = 'normal';
    }, 10); 
  } else {
    console.log('Verificando datos del usuario...');
    this.errorState = 'normal';
  }
}

}
