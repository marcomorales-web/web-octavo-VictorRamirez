// import { Component } from '@angular/core';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-equipos',
//   standalone: true,
//   imports: [RouterLink],
//   templateUrl: './equipos.html',
//   styleUrl: './equipos.css',
// })
// export class Equipos {

// }

// import { Component, OnInit } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { MlbService } from '../services/mlb';

// @Component({
//   selector: 'app-equipos',
//   standalone: true,
//   imports: [RouterLink],
//   templateUrl: './equipos.html',
//   styleUrl: './equipos.css',
// })
// export class Equipos implements OnInit {

//   equipos: any[] = [];

//   constructor(private mlbService: MlbService) {}

//   ngOnInit() {
//     this.mlbService.obtenerEquipos().subscribe((data: any) => {
//       this.equipos = data.sports[0].leagues[0].teams;
//       console.log(this.equipos);
//     });
//   }

// }

// import { Component, OnInit } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { MlbService } from '../services/mlb';

// @Component({
//   selector: 'app-equipos',
//   standalone: true,
//   imports: [RouterLink, CommonModule],
//   templateUrl: './equipos.html',
//   styleUrl: './equipos.css',
// })
// export class Equipos implements OnInit {

//   equipos:any[] = [];

//   constructor(private mlbService: MlbService){}

//   ngOnInit(){
//     this.mlbService.obtenerEquipos().subscribe((data:any)=>{
//       this.equipos = data.sports[0].leagues[0].teams;
//       console.log(this.equipos);
//     });
//   }

// }

import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MlbService } from '../services/mlb';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './equipos.html',
  styleUrl: './equipos.css',
})
// export class Equipos implements OnInit {

//   equipos:any[] = [];

//   constructor(private mlbService: MlbService){}

//   ngOnInit(){
//     this.mlbService.obtenerEquipos().subscribe((data:any)=>{
//       this.equipos = data.sports[0].leagues[0].teams;
//       console.log(this.equipos);
//     });
//   }

//   buscarEquipo(event:any){

//     const texto = event.target.value.toLowerCase();

//     const index = this.equipos.findIndex((e:any) =>
//       e.team.displayName.toLowerCase().includes(texto)
//     );

//     if(index !== -1){
//       const radio = document.getElementById('radio-' + (index+1)) as HTMLInputElement;
//       if(radio){
//         radio.checked = true;
//       }
//     }

//   }
// }

// export class EquiposComponent implements OnInit {

//   equipos: any[] = [];
//   equiposOriginal: any[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.cargarEquipos();
//   }

//   cargarEquipos() {
//     this.http.get<any>('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams')
//       .subscribe(data => {

//         this.equipos = data.sports[0].leagues[0].teams;
//         this.equiposOriginal = [...this.equipos];

//       });
//   }

//   buscarEquipo(event: any) {

//     const texto = event.target.value.toLowerCase();

//     this.equipos = this.equiposOriginal.filter(e =>
//       e.team.displayName.toLowerCase().includes(texto)
//     );

//   }

// }

// export class Equipos implements OnInit {

//   equipos:any[] = [];
//   fondoEstadio:string = '';

//   constructor(private mlbService: MlbService){}

//   ngOnInit(){
//     this.mlbService.obtenerEquipos().subscribe((data:any)=>{

//       this.equipos = data.sports[0].leagues[0].teams;
//       console.log(this.equipos);

//     });
//   }

//   buscarEquipo(event:any){

//     const texto = event.target.value.toLowerCase();

//     const index = this.equipos.findIndex((e:any) =>
//       e.team.displayName.toLowerCase().includes(texto)
//     );

//     if(index !== -1){

//       const radio = document.getElementById('radio-' + (index+1)) as HTMLInputElement;

//       if(radio){
//         radio.checked = true;
//       }

//     }

//   }

// }

export class Equipos implements OnInit {

  equipos: any[] = [];
  fondoEstadio: string = '';

  constructor(
    private mlbService: MlbService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.mlbService.obtenerEquipos().subscribe((data: any) => {
      this.equipos = data.sports[0].leagues[0].teams;

      if (this.equipos.length) {
        this.fondoEstadio = this.estadios[this.equipos[0].team.displayName] || '';
      }
      
      this.cdr.detectChanges();

      setTimeout(() => {
        const primerRadio = document.getElementById('radio-1') as HTMLInputElement;
        if (primerRadio) {
          primerRadio.checked = true;
        }

        if (this.equipos.length) {
          this.cambiarFondo(this.equipos[0].team.displayName);
        }
      }, 100);
    });
  }

  buscarEquipo(event: any) {
    const texto = event.target.value.toLowerCase();

    if (!texto) {
      const radioUno = document.getElementById('radio-1') as HTMLInputElement;
      if (radioUno) radioUno.checked = true;

      if (this.equipos.length) {
        this.cambiarFondo(this.equipos[0].team.displayName);
      }
      return;
    }

    const index = this.equipos.findIndex((e: any) =>
      e.team.displayName.toLowerCase().includes(texto)
    );

    if (index !== -1) {
      const radio = document.getElementById('radio-' + (index + 1)) as HTMLInputElement;
      if (radio) {
        radio.checked = true;

        this.cambiarFondo(this.equipos[index].team.displayName);
      }
    }
  }

  estadios: { [key: string]: string } = {
    "Arizona Diamondbacks": "../../assets/img/Estadios/Dbacks.jpg",
    "Athletics": "../../assets/img/Estadios/Atletics.jpg",
    "Atlanta Braves": "../../assets/img/Estadios/Braves.jpg",
    "Baltimore Orioles": "../../assets/img/Estadios/Orioles.jpg",
    "Boston Red Sox": "../../assets/img/Estadios/RedSox.jpg",
    "Chicago Cubs": "../../assets/img/Estadios/Cubs.jpg",
    "Chicago White Sox": "../../assets/img/Estadios/WhiteSox.jpg",
    "Cincinnati Reds": "../../assets/img/Estadios/Reds.jpg",
    "Cleveland Guardians": "../../assets/img/Estadios/Guardians.jpg",
    "Colorado Rockies": "../../assets/img/Estadios/Colorado.jpg",
    "Detroit Tigers": "../../assets/img/Estadios/Detroit.jpg",
    "Houston Astros": "../../assets/img/Estadios/Astros.jpg",
    "Kansas City Royals": "../../assets/img/Estadios/Royals.jpg",
    "Los Angeles Angels": "../../assets/img/Estadios/Angels.jpg",
    "Los Angeles Dodgers": "../../assets/img/Estadios/Dodgers.jpg",
    "Miami Marlins": "../../assets/img/Estadios/Marlins.jpg",
    "Milwaukee Brewers": "../../assets/img/Estadios/Brewers.avif",
    "Minnesota Twins": "../../assets/img/Estadios/Twins.jpg",
    "New York Mets": "../../assets/img/Estadios/Mets.jpg",
    "New York Yankees": "../../assets/img/Estadios/Yankees.jpg",
    "Philadelphia Phillies": "../../assets/img/Estadios/Phillies.jpg",

    "Pittsburgh Pirates": "../../assets/img/Estadios/Pirates.jpg",
    "San Diego Padres": "../../assets/img/Estadios/Padres.jpg",
    "San Francisco Giants": "../../assets/img/Estadios/Giants.jpg",
    "Seattle Mariners": "../../assets/img/Estadios/Mariners.jpg",
    "St. Louis Cardinals": "../../assets/img/Estadios/Cardinals.jpg",
    "Tampa Bay Rays": "../../assets/img/Estadios/Tampa.jpg",

    "Texas Rangers": "../../assets/img/Estadios/Texas.jpg",
    "Toronto Blue Jays": "../../assets/img/Estadios/Jays.jpg",
    "Washington Nationals": "../../assets/img/Estadios/WAS.jpg",
    
  };

  cambiarFondo(nombreEquipo: string) {
    this.fondoEstadio = this.estadios[nombreEquipo] || '';
    console.log(nombreEquipo);
  }

  historiasEquipos: { [key: string]: string } = {
    "Arizona Diamondbacks": "Fundados en 1998 en Phoenix, lograron su primer título en 2001 tras vencer a los Yankees en una Serie Mundial histórica. Son conocidos por su rápido ascenso competitivo.",
    "Athletics": "Con sede en Oakland, es una de las franquicias más exitosas históricamente, con múltiples títulos. Destacan por su enfoque analítico popularizado por el concepto 'Moneyball'.",
    "Atlanta Braves": "Fundados en 1871, son uno de los equipos más antiguos. Han ganado varias Series Mundiales y dominaron su división durante los años 90 con gran consistencia.",
    "Baltimore Orioles": "Equipo tradicional de la Liga Americana con tres títulos. Tuvieron una era dorada en los años 60 y 70 con jugadores legendarios como Cal Ripken Jr.",
    "Boston Red Sox": "Fundados en 1901, rompieron la famosa Maldición del Bambino en 2004. Desde entonces han sido uno de los equipos más competitivos y mediáticos.",
    "Chicago Cubs": "Uno de los equipos más históricos, rompieron una sequía de 108 años al ganar en 2016. Su estadio Wrigley Field es uno de los más emblemáticos.",
    "Chicago White Sox": "Ganadores en 1906, 1917 y 2005. Tienen una rica historia marcada por momentos icónicos y rivalidad directa con los Cubs.",
    "Cincinnati Reds": "Considerados el primer equipo profesional, destacan por la 'Big Red Machine' de los años 70, una de las dinastías más dominantes.",
    "Cleveland Guardians": "Con una larga historia en la MLB, han sido contendientes en varias épocas. Cambiaron su nombre recientemente manteniendo su legado competitivo.",
    "Colorado Rockies": "Fundados en 1993, juegan en el Coors Field, conocido por favorecer ofensivas. Alcanzaron la Serie Mundial en 2007.",
    "Detroit Tigers": "Uno de los equipos más antiguos de la Liga Americana, con múltiples títulos. Han contado con grandes figuras a lo largo de su historia.",
    "Houston Astros": "Equipo moderno que ha destacado recientemente, ganando títulos en 2017 y 2022. Son protagonistas constantes en playoffs.",
    "Kansas City Royals": "Ganadores en 1985 y 2015, son conocidos por su enfoque en el juego colectivo y el desarrollo de talento joven.",
    "Los Angeles Angels": "Con base en California, han tenido grandes estrellas como Mike Trout y Shohei Ohtani, aunque con resultados irregulares en playoffs.",
    "Los Angeles Dodgers": "Una de las franquicias más exitosas y populares, con múltiples campeonatos y constante presencia en postemporada.",
    "Miami Marlins": "A pesar de ser un equipo joven, han ganado dos Series Mundiales (1997 y 2003), ambas como underdogs.",
    "Milwaukee Brewers": "Equipo competitivo de la Liga Nacional que ha crecido en los últimos años gracias a su sólido desarrollo de jugadores.",
    "Minnesota Twins": "Ganadores en 1987 y 1991, han sido protagonistas en distintas épocas con un enfoque ofensivo destacado.",
    "New York Mets": "Fundados en 1962, han ganado dos títulos. Son conocidos por su afición apasionada y momentos históricos inesperados.",
    "New York Yankees": "La franquicia más ganadora en la historia, con 27 títulos. Representan el éxito y la tradición del béisbol.",
    "Philadelphia Phillies": "Equipo histórico con títulos en 1980 y 2008. Han sido contendientes recientes con una ofensiva poderosa.",
    "Pittsburgh Pirates": "Uno de los equipos más antiguos, con múltiples títulos en el pasado. Destacaron especialmente en los años 70.",
    "San Diego Padres": "Equipo competitivo en años recientes, con grandes estrellas. Han alcanzado la Serie Mundial en dos ocasiones.",
    "San Francisco Giants": "Franquicia histórica con varios campeonatos recientes (2010, 2012, 2014), destacando por su pitcheo y estrategia.",
    "Seattle Mariners": "Fundados en 1977, han tenido grandes jugadores como Ken Griffey Jr. y buscan consolidarse como contendientes.",
    "St. Louis Cardinals": "Uno de los equipos más exitosos con múltiples títulos. Destacan por su consistencia y cultura ganadora.",
    "Tampa Bay Rays": "Equipo moderno que maximiza recursos con análisis avanzado. Han sido muy competitivos con bajo presupuesto.",
    "Texas Rangers": "Ganadores de la Serie Mundial en 2023, han construido un equipo fuerte en los últimos años tras varias reconstrucciones.",
    "Toronto Blue Jays": "Único equipo canadiense, ganó títulos consecutivos en 1992 y 1993. Cuenta con una afición muy leal.",
    "Washington Nationals": "Fundados en 2005, lograron su primer campeonato en 2019 con una destacada actuación colectiva."
  };

  // historiasEquipos: { [key: string]: string } = {
  //     "Arizona Diamondbacks": "Fundados en 1998, los Diamondbacks ganaron la Serie Mundial en 2001 al derrotar a los Yankees.",
  //     "Athletics": "Equipo con múltiples títulos de Serie Mundial.",
  //     "Atlanta Braves": "Uno de los equipos más antiguos de la MLB, fundado en 1871. Ha ganado múltiples Series Mundiales.",
  //     "Baltimore Orioles": "Equipo histórico de la Liga Americana con tres campeonatos de Serie Mundial.",
  //     "Boston Red Sox": "Fundados en 1901, rompieron la famosa 'Maldición del Bambino' al ganar la Serie Mundial en 2004.",
  //     "Chicago Cubs": "Uno de los equipos más antiguos del béisbol, famoso por romper una sequía de 108 años al ganar en 2016.",
  //     "Chicago White Sox": "Campeones de la Serie Mundial en 1906, 1917 y 2005.",
  //     "Cincinnati Reds": "Uno de los equipos más históricos del béisbol profesional.",
  //     "Cleveland Guardians": "Anteriormente conocidos como Indians, tienen una rica historia en la MLB.",
  //     "Colorado Rockies": "Fundados en 1993 y conocidos por jugar en el Coors Field en Denver.",
  //     "Detroit Tigers": "Uno de los equipos más antiguos de la Liga Americana.",
  //     "Houston Astros": "Campeones de la Serie Mundial en 2017 y 2022.",
  //     "Kansas City Royals": "Campeones en 1985 y 2015.",
  //     "Los Angeles Angels": "Equipo de California conocido por estrellas como Mike Trout.",
  //     "Los Angeles Dodgers": "Uno de los equipos más exitosos de la MLB.",
  //     "Miami Marlins": "Equipo joven con dos títulos de Serie Mundial.",
  //     "Milwaukee Brewers": "Equipo competitivo de la Liga Nacional.",
  //     "Minnesota Twins": "Ganadores de la Serie Mundial en 1987 y 1991.",
  //     "New York Mets": "Fundados en 1962, campeones en 1969 y 1986.",
  //     "New York Yankees": "El equipo más ganador en la historia del béisbol.",
  //     "Philadelphia Phillies": "Campeones en 1980 y 2008.",
  //     "Pittsburgh Pirates": "Uno de los equipos más antiguos de la MLB.",
  //     "San Diego Padres": "Equipo de California con varias apariciones en Serie Mundial.",
  //     "San Francisco Giants": "Equipo histórico con múltiples campeonatos.",
  //     "Seattle Mariners": "Fundados en 1977, conocidos por grandes jugadores.",
  //     "St. Louis Cardinals": "Uno de los equipos más exitosos de la MLB.",
  //     "Tampa Bay Rays": "Equipo moderno con gran desarrollo de talento.",
  //     "Texas Rangers": "Campeones de la Serie Mundial en 2023.",
  //     "Toronto Blue Jays": "Único equipo canadiense en la MLB.",
  //     "Washington Nationals": "Campeones de la Serie Mundial en 2019."
  //   };
}