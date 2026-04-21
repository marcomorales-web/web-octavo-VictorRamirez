import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  selector: 'app-registro',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
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

  constructor(private authService: Auth) {}

  triggerError(): void {
    this.registerState = 'error';
    setTimeout(() => {
      this.registerState = 'normal';
    }, 10);
  }

  nombre: string = '';
  apellidos: string = '';
  email: string = '';
  contrasenna: string = '';
  confirmarContrasenna: string = '';
  mensajeError: string = '';

  registerState: 'normal' | 'error' = 'normal';

  logoState: 'in' | 'out' = 'in';

  inputFocus:
  | 'nombre'
  | 'apellidos'
  | 'email'
  | 'contrasenna'
  | 'confirmarContrasenna'
  | null = null;

  setFocus(field: any) {
    this.inputFocus = field;
  }

  clearFocus() {
    this.inputFocus = null;
  }

  register(): void {

    if (
      !this.nombre ||
      !this.apellidos ||
      !this.email ||
      !this.contrasenna ||
      !this.confirmarContrasenna
    ) {
      this.mensajeError = 'Todos los campos son obligatorios';
      this.triggerError();
      return;
    }

    if (this.contrasenna !== this.confirmarContrasenna) {
      this.mensajeError = 'Las contraseñas no coinciden';
      this.triggerError();
      return;
    }

    if (!this.email.includes('@') || !this.email.includes('.')) {
      this.mensajeError = 'Correo electrónico inválido';
      this.triggerError();
      return;
    }

    const usuario = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      password: this.contrasenna
    };

    const resultado = this.authService.registrarUsuario(usuario);

    if (!resultado.exito) {
      this.mensajeError = resultado.mensaje;
      this.triggerError();
      return;
    }

    this.mensajeError = '';

    this.nombre = '';
    this.apellidos = '';
    this.email = '';
    this.contrasenna = '';
    this.confirmarContrasenna = '';
  }
}