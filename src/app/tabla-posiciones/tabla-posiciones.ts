// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { Subscription } from 'rxjs';
// import { MlbService } from '../services/mlb';

// @Component({
//   selector: 'app-tabla-posiciones',
//   standalone: true,
//   imports: [CommonModule, RouterModule, FormsModule],
//   templateUrl: './tabla-posiciones.html',
//   styleUrl: './tabla-posiciones.css',
// })
// export class TablaPosiciones implements OnInit, OnDestroy {

//   standings: any[] = [];
//   standingsFiltrados: any[] = [];
//   ligaSeleccionada: string = '103';
//   error: string = '';
//   private sub?: Subscription;

//   constructor(private mlbService: MlbService) {}

//   ngOnInit(): void {
//     this.cargarStandings();
//   }

//   ngOnDestroy(): void {
//     this.sub?.unsubscribe();
//   }

//   cargarStandings() {
//     this.error = '';
//     this.sub = this.mlbService.obtenerStandings(Number(this.ligaSeleccionada)).subscribe({
//       next: (data: any) => {
//         const records = data.records || [];
//         this.standings = records.map((division: any) => ({
//           ...division,
//           teamRecords: division.teamRecords.sort((a: any, b: any) => b.wins - a.wins)
//         }));
//         this.standingsFiltrados = [...this.standings];
//       },
//       error: () => {
//         this.error = 'Error al cargar la tabla de posiciones';
//       }
//     });
//   }

//   onLigaChange() {
//     this.cargarStandings();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MlbService } from '../services/mlb';

@Component({
  selector: 'app-tabla-posiciones',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tabla-posiciones.html',
  styleUrl: './tabla-posiciones.css',
})
export class TablaPosiciones implements OnInit {

  standings: any[] = [];
  standingsFiltrados: any[] = [];

  ligaSeleccionada: string = '103';

  cargando: boolean = false;
  error: string = '';

  cachePorLiga: { [key: string]: any[] } = {};

  constructor(private mlbService: MlbService) {}

  ngOnInit(): void {
    this.cargarLigaInicial();
    this.precargarLigaSecundaria();
  }

  cargarLigaInicial() {
    this.cargando = true;

    this.mlbService.obtenerStandings(103).subscribe({
      next: (data: any) => {
        const processed = this.procesar(data);
        this.cachePorLiga['103'] = processed;

        this.standings = processed;
        this.standingsFiltrados = processed;

        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar la tabla de posiciones';
        this.cargando = false;
      }
    });
  }

  precargarLigaSecundaria() {
    this.mlbService.obtenerStandings(104).subscribe({
      next: (data: any) => {
        this.cachePorLiga['104'] = this.procesar(data);
      }
    });
  }

  procesar(data: any) {
    const records = data.records || [];

    return records.map((division: any) => ({
      ...division,
      teamRecords: division.teamRecords.sort((a: any, b: any) => b.wins - a.wins)
    }));
  }

  onLigaChange() {
    const cache = this.cachePorLiga[this.ligaSeleccionada];

    if (cache) {
      this.standings = cache;
      this.standingsFiltrados = cache;
      return;
    }

    this.cargando = true;

    this.mlbService.obtenerStandings(Number(this.ligaSeleccionada)).subscribe({
      next: (data: any) => {
        const processed = this.procesar(data);

        this.cachePorLiga[this.ligaSeleccionada] = processed;
        this.standings = processed;
        this.standingsFiltrados = processed;

        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar la tabla de posiciones';
        this.cargando = false;
      }
    });
  }
}

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { MlbService } from '../services/mlb';

// @Component({
//   selector: 'app-tabla-posiciones',
//   standalone: true,
//   imports: [CommonModule, RouterModule, FormsModule],
//   templateUrl: './tabla-posiciones.html',
//   styleUrl: './tabla-posiciones.css',
// })
// export class TablaPosiciones implements OnInit {

//   standings: any[] = [];
//   standingsFiltrados: any[] = [];

//   ligaSeleccionada: string = '103';

//   cargando: boolean = false;
//   error: string = '';

//   cachePorLiga: { [key: string]: any[] } = {};

//   constructor(private mlbService: MlbService) {}

//   ngOnInit(): void {
//     this.precargarLigas();
//   }

//   precargarLigas() {
//     this.cargando = true;

//     const ligas = ['103', '104'];

//     ligas.forEach((liga) => {
//       this.mlbService.obtenerStandings(Number(liga)).subscribe({
//         next: (data: any) => {
//           const records = data.records || [];

//           const processed = records.map((division: any) => ({
//             ...division,
//             teamRecords: division.teamRecords.sort((a: any, b: any) => b.wins - a.wins)
//           }));

//           this.cachePorLiga[liga] = processed;

//           if (liga === this.ligaSeleccionada) {
//             this.standings = processed;
//             this.standingsFiltrados = processed;
//           }

//           if (this.cachePorLiga['103'] && this.cachePorLiga['104']) {
//             this.cargando = false;
//           }
//         },
//         error: () => {
//           this.error = 'Error al cargar la tabla de posiciones';
//           this.cargando = false;
//         }
//       });
//     });
//   }

//   onLigaChange() {
//     const data = this.cachePorLiga[this.ligaSeleccionada];

//     if (data) {
//       this.standings = data;
//       this.standingsFiltrados = data;
//     }
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { MlbService } from '../services/mlb';

// @Component({
//   selector: 'app-tabla-posiciones',
//   standalone: true,
//   imports: [CommonModule, RouterModule, FormsModule],
//   templateUrl: './tabla-posiciones.html',
//   styleUrl: './tabla-posiciones.css',
// })
// export class TablaPosiciones implements OnInit {

//   standings: any[] = [];
//   standingsFiltrados: any[] = [];

//   ligaSeleccionada: string = '';
//   divisionSeleccionada: string = '';

//   cargando: boolean = false;
//   error: string = '';

//   cachePorLiga: { [key: string]: any[] } = {};

//   constructor(private mlbService: MlbService) {}

//   ngOnInit(): void {
//     this.ligaSeleccionada = '103';
//     this.cargarStandings();
//   }

//   cargarStandings() {
//     const leagueKey = this.ligaSeleccionada || 'all';

//     if (this.cachePorLiga[leagueKey]) {
//       this.standings = this.cachePorLiga[leagueKey];
//       this.aplicarFiltros();
//       return;
//     }

//     this.cargando = true;
//     this.error = '';

//     const leagueId = this.ligaSeleccionada
//       ? Number(this.ligaSeleccionada)
//       : undefined;

//     this.mlbService.obtenerStandings(leagueId).subscribe({
//       next: (data: any) => {
//         const records = data.records || [];

//         const processed = records.map((division: any) => ({
//           ...division,
//           teamRecords: division.teamRecords.sort((a: any, b: any) => b.wins - a.wins)
//         }));

//         this.cachePorLiga[leagueKey] = processed;
//         this.standings = processed;

//         this.aplicarFiltros();
//         this.cargando = false;
//       },
//       error: () => {
//         this.error = 'Error al cargar la tabla de posiciones';
//         this.cargando = false;
//       }
//     });
//   }

//   aplicarFiltros() {
//     if (!this.divisionSeleccionada) {
//       this.standingsFiltrados = this.standings;
//       return;
//     }

//     this.standingsFiltrados = this.standings.filter(record =>
//       record.division?.name?.includes(this.divisionSeleccionada)
//     );
//   }

//   onLigaChange() {
//     this.divisionSeleccionada = '';
//     this.cargarStandings();
//   }

//   onDivisionChange() {
//     this.aplicarFiltros();
//   }
// }