// //es una interfaz que permite usar el ciclo de vida ngOnInit()
// import { Component, OnInit } from '@angular/core';
// import { MlbService } from '../services/mlb';
// import { CommonModule } from '@angular/common';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatNativeDateModule } from '@angular/material/core';
// import { FormsModule } from '@angular/forms';
// import { ChangeDetectorRef } from '@angular/core';

// @Component({
//   selector: 'app-resultados',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatDatepickerModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatNativeDateModule
//   ],
//   templateUrl: './resultados.html',
//   styleUrls: ['./resultados.css']
// })


// export class Resultados implements OnInit {

//   juegos: any;
//   fechaSeleccionada!: Date;

//   constructor(private mlbService: MlbService) {}

//   ngOnInit(): void {
//     this.fechaSeleccionada = new Date();
//     this.cargarJuegos();
//   }

//   cargarJuegos(fecha?: Date): void {

//   if (fecha) {
//     this.fechaSeleccionada = fecha;
//   }

//   if (!this.fechaSeleccionada) return;

//   const fechaFormateada = this.fechaSeleccionada
//     .toISOString()
//     .split('T')[0];

//   this.mlbService.obtenerJuegosPorFecha(fechaFormateada)
//     .subscribe({
//       next: (data: any) => {
//         const fechas = data?.dates;

//         if (fechas && fechas.length > 0) {
//           this.juegos = fechas[0].games;
//         } else {
//           this.juegos = [];
//         }
//       },
//       error: (err) =>
//         console.error('Error al traer resultados:', err)
//     });
// }
// }

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MlbService } from '../services/mlb';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    RouterLink
  ],
  templateUrl: './resultados.html',
  styleUrls: ['./resultados.css']
})
export class Resultados implements OnInit {

  juegos: any[] = [];  
  fechaSeleccionada!: Date;

  constructor(
    private mlbService: MlbService,
    private cd: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.fechaSeleccionada = new Date();
    this.cargarJuegos(this.fechaSeleccionada);
  }

  cargarJuegos(fecha?: Date): void {

    if (fecha) {
      this.fechaSeleccionada = fecha;
    }

    if (!this.fechaSeleccionada) return;

    const annos = this.fechaSeleccionada.getFullYear();
    const mes = String(this.fechaSeleccionada.getMonth() + 1).padStart(2, '0');
    const dia = String(this.fechaSeleccionada.getDate()).padStart(2, '0');

    const fechaFormateada = `${annos}-${mes}-${dia}`;

    this.mlbService.obtenerJuegosPorFecha(fechaFormateada)
      .subscribe({
        next: (data: any) => {

          const fechas = data?.dates;

          if (fechas && fechas.length > 0) {
            this.juegos = [...fechas[0].games]; 

            this.juegos.forEach(juego => {
            if (juego.status.abstractGameState === 'Live') {
              this.verEntrada(juego);
            }
          });
          } else {
            this.juegos = [];
          }

          this.cd.detectChanges();
        },
        error: (err) =>
          console.error('Error al traer resultados:', err)
      });
  }

  verEntrada(juego: any): void {

  if (juego.status.abstractGameState !== 'Live') return;

  this.mlbService.obtenerDetalleJuego(juego.gamePk)
    .subscribe((data: any) => {

      const linescore = data?.liveData?.linescore;

      if (linescore) {

        juego.entradaActual =
          linescore.inningHalf + " " + linescore.currentInning;

        this.cd.detectChanges();
      }
    });
}
}