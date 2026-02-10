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
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
  animations: [

    // Entrada del formulario
    trigger('formAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ]),

    // Entrada del logo
    trigger('logoAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('700ms ease-out',
          style({ opacity: 1, transform: 'scale(1)' })
        )
      ])
    ]),

    // Breathing del logo
    trigger('logoBreathing', [
      state('in', style({ transform: 'scale(1)' })),
      state('out', style({ transform: 'scale(1.04)' })),
      transition('in <=> out', animate('3s ease-in-out'))
    ]),

    // Animación inputs (focus)
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

    // Botón
    trigger('buttonAnim', [
      transition('* => *', [
        animate('200ms', keyframes([
          style({ transform: 'scale(1)' }),
          style({ transform: 'scale(0.96)' }),
          style({ transform: 'scale(1)' })
        ]))
      ])
    ]),

    // Error shake
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
export class Registro {

  // Estado del registro
  registerState: 'normal' | 'error' = 'normal';

  // Estado del logo
  logoState: 'in' | 'out' = 'in';

  // Input activo
  inputFocus:
  | 'nombre'
  | 'apellidos'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | null = null;


  setFocus(field: any) {
    this.inputFocus = field;
  }

  clearFocus() {
    this.inputFocus = null;
  }

  register(): void {
    // Simulación de error (igual que login)
    this.registerState = 'error';

    setTimeout(() => {
      this.registerState = 'normal';
    }, 10);
  }
}
