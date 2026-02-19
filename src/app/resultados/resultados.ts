import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MlbService } from '../services/mlb';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './resultados.html',
  styleUrls: ['./resultados.css'] 
})
export class Resultados implements OnInit {
  juegos: any;

  constructor(private mlbService: MlbService) {}

  ngOnInit(): void {
  const fechaPrueba = '2026-02-20';

  this.mlbService.obtenerJuegosPorFecha(fechaPrueba).subscribe({
    next: (data: any) => {

      console.log('Respuesta completa:', data);

      const fechas = data?.dates;

      if (fechas && fechas.length > 0) {

        const juegos = fechas[0].games;

        juegos.forEach((juego: any) => {
          const visitante = juego.teams.away.team.name;
          const local = juego.teams.home.team.name;

          console.log(`${visitante} vs ${local}`);
        });

      } else {
        console.log('No hay juegos en esa fecha');
      }
    },
    error: (err) => console.error('Error al traer resultados:', err)
  });
}

}