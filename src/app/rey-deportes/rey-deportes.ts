// import { Component } from '@angular/core';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-rey-deportes',
//   standalone: true,
//   imports: [RouterLink],
//   templateUrl: './rey-deportes.html',
//   styleUrl: './rey-deportes.css',
// })
// export class ReyDeportes {

// }

import { Component, OnInit, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Jugador {
  nombre: string;
  anio: string;
  era: string;
  desc: string;
  extra: string;
}

interface Momento {
  icon: string;
  anio: string;
  titulo: string;
  desc: string;
  descLarga: string;
  tag: string;
  color: string;
  tagBg: string;
  tagColor: string;
}

@Component({
  selector: 'app-rey-deportes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rey-deportes.html',
  styleUrl: './rey-deportes.css',
})
export class ReyDeportesComponent implements OnInit, AfterViewInit {

  @ViewChildren('historiaRef, hofRef, momentosRef, fraseRef')
  secciones!: QueryList<ElementRef>;

  stats = [
    { num: '170+', lbl: 'Años de historia' },
    { num: '30',   lbl: 'Franquicias MLB' },
    { num: '351',  lbl: 'Inmortales HOF' }
  ];

  historiaTarjetas = [
    { icon: '⏱️', titulo: 'Sin reloj', desc: 'El único deporte donde el tiempo no determina el resultado. El último out manda.' },
    { icon: '🌎', titulo: 'Deporte global', desc: 'De Japón a Cuba, el béisbol une culturas con un mismo idioma universal.' },
    { icon: '✊', titulo: 'Impacto social', desc: 'Jackie Robinson cambió el béisbol y el país al romper la barrera racial en 1947.' }
  ];

  eras = [
    { id: 'fundacional', nombre: 'Fundacional' },
    { id: 'oro',         nombre: 'Era de Oro' },
    { id: 'moderna',     nombre: 'Era Moderna' },
    { id: 'contemporanea', nombre: 'Contemporánea' }
  ];

  eraActiva = 'fundacional';

  jugadores: Jugador[] = [
    {
      nombre: 'Babe Ruth — El Bambino',
      anio: '1936 · Clase inaugural',
      era: 'fundacional',
      desc: '714 home runs, 7 Series Mundiales. Transformó el béisbol en un espectáculo de poder.',
      extra: 'El jugador más reconocible en la historia del deporte. Su número 3 fue retirado por los Yankees en 1948.'
    },
    {
      nombre: 'Ty Cobb — El Melocotón de Georgia',
      anio: '1936 · Clase inaugural',
      era: 'fundacional',
      desc: 'Promedio de bateo de .366 de por vida, el más alto en la historia.',
      extra: 'Obtuvo más votos que Babe Ruth en la primera elección del Salón de la Fama. Apodado el más feroz competidor que el béisbol haya visto jamás.'
    },
    {
      nombre: 'Honus Wagner — El Gran Holandés',
      anio: '1936 · Clase inaugural',
      era: 'fundacional',
      desc: 'Considerado el mejor shortstop de todos los tiempos.',
      extra: 'Su tarjeta de béisbol T206 es la más valiosa de la historia, vendida por millones de dólares. Rechazó que su imagen fuera usada en productos de tabaco.'
    },
    {
      nombre: 'Lou Gehrig — El Caballo de Hierro',
      anio: '1939 · Elección especial',
      era: 'fundacional',
      desc: '2,130 juegos consecutivos, récord que duró 56 años.',
      extra: 'Su emotivo discurso de despedida tras diagnosticársele ELA sigue siendo uno de los momentos más conmovedores del deporte americano.'
    },
    {
      nombre: 'Jackie Robinson — La barrera rota',
      anio: '1962',
      era: 'oro',
      desc: 'El primero en romper la segregación racial en las Grandes Ligas en 1947.',
      extra: 'Su número 42 es el único retirado por las 30 franquicias de la MLB. Héroe civil antes que ídolo deportivo. Recibió la Medalla Presidencial de la Libertad.'
    },
    {
      nombre: 'Willie Mays — El Say Hey Kid',
      anio: '1979',
      era: 'oro',
      desc: '660 home runs, dos veces MVP y 24 All-Stars.',
      extra: '"The Catch" en la Serie Mundial de 1954 sigue siendo la atrapada más famosa de la historia. Muchos lo consideran el jugador más completo de todos los tiempos.'
    },
    {
      nombre: 'Sandy Koufax — El lanzador perfecto',
      anio: '1972',
      era: 'oro',
      desc: 'Cuatro no-hitters incluyendo un juego perfecto. Tres premios Cy Young en cuatro años.',
      extra: 'Se retiró a los 30 años por artritis, en la cima absoluta de su carrera. Su ERA de 2.76 de por vida es uno de los más bajos en la era moderna.'
    },
    {
      nombre: 'Hank Aaron — Hammerin Hank',
      anio: '1982',
      era: 'oro',
      desc: '755 home runs de carrera. Superó el récord de Ruth entre amenazas de muerte.',
      extra: 'Símbolo de dignidad y persistencia para toda una generación. Mantuvo un promedio de al menos 30 jonrones por temporada durante 20 años consecutivos.'
    },
    {
      nombre: 'Roberto Clemente — El Puertorriqueño eterno',
      anio: '1973 · Póstumo especial',
      era: 'oro',
      desc: 'Murió llevando ayuda humanitaria a Nicaragua en un accidente aéreo.',
      extra: 'El HOF eliminó el período de espera de cinco años en su honor. El premio humanitario de la MLB lleva su nombre. Exactamente 3,000 hits en su carrera.'
    },
    {
      nombre: 'Nolan Ryan — The Ryan Express',
      anio: '1999',
      era: 'moderna',
      desc: '5,714 ponches — un récord que probablemente nunca será superado.',
      extra: 'Siete no-hitters. Lanzó a más de 160 km/h a los 46 años de edad. Jugó 27 temporadas en las Grandes Ligas, un récord de longevidad para un lanzador.'
    },
    {
      nombre: 'Cal Ripken Jr. — El Hombre de Hierro',
      anio: '2007',
      era: 'moderna',
      desc: '2,632 juegos consecutivos, superando el mítico récord de Lou Gehrig.',
      extra: 'Redefinió lo que significa el compromiso y la profesionalidad en el béisbol moderno. Dos veces MVP de la Liga Americana.'
    },
    {
      nombre: 'Tony Gwynn — Mr. Padre',
      anio: '2007',
      era: 'moderna',
      desc: 'Ocho títulos de bateo. En 1994 tenía promedio de .394 antes de la huelga.',
      extra: 'Posiblemente la última oportunidad real de batear .400 en la historia moderna. Pasó toda su carrera con los Padres de San Diego, un gesto de lealtad hoy casi imposible.'
    },
    {
      nombre: 'Ken Griffey Jr. — El Kid',
      anio: '2016',
      era: 'contemporanea',
      desc: 'Ingresó con el 99.3% de los votos, el porcentaje más alto en la historia del HOF.',
      extra: '630 home runs. Su swing zurdo fue declarado el más hermoso del béisbol moderno. A los 19 años ya era All-Star.'
    },
    {
      nombre: 'Mariano Rivera — El Cerrador',
      anio: '2019',
      era: 'contemporanea',
      desc: 'El único elegido por unanimidad absoluta (100% de los votos) en la historia del HOF.',
      extra: '652 salvamentos. Su cutter devastó a generaciones enteras de bateadores. Cinco veces campeón de la Serie Mundial con los Yankees.'
    },
    {
      nombre: 'Derek Jeter — El Capitán',
      anio: '2021',
      era: 'contemporanea',
      desc: 'Cinco Series Mundiales y el rostro de los Yankees en la era moderna.',
      extra: '"The Flip" en los playoffs de 2001 es una de las jugadas más inteligentes en postemporada. Su número 2 fue retirado por los Yankees en 2017.'
    },
    {
      nombre: 'Ichiro Suzuki — El embajador global',
      anio: '2025',
      era: 'contemporanea',
      desc: '3,089 hits en MLB más 1,278 en Japón. Una leyenda sin fronteras.',
      extra: 'Su llegada a Seattle en 2001 abrió las puertas del béisbol a millones de fanáticos asiáticos. Diez títulos consecutivos del Guante de Oro.'
    }
  ];

  jugadoresFiltrados(): Jugador[] {
    return this.jugadores.filter(j => j.era === this.eraActiva);
  }

  cambiarEra(id: string): void {
    this.eraActiva = id;
  }

  momentos: Momento[] = [
    {
      icon: '🏆', anio: '3 de octubre, 1951',
      titulo: 'El disparo escuchado alrededor del mundo',
      desc: 'Bobby Thomson conectó un jonrón de tres carreras en el noveno inning para dar a los Gigantes la victoria sobre los Dodgers.',
      descLarga: 'Bobby Thomson conectó un jonrón de tres carreras en el noveno inning del desempate de la Liga Nacional. La transmisión de Russ Hodges —"¡Los Gigantes ganaron el campeonato!"— se convirtió en el grito deportivo más famoso de la historia. Los Gigantes remontaron un déficit de 13.5 juegos en agosto para ganar el banderín.',
      tag: 'Jugada histórica', color: '#FAEEDA', tagBg: '#FAEEDA', tagColor: '#633806'
    },
    {
      icon: '📅', anio: '15 may – 17 jul, 1941',
      titulo: '56 juegos consecutivos con hit — Joe DiMaggio',
      desc: 'La racha más imposible del béisbol. Durante 56 partidos seguidos, DiMaggio conectó al menos un hit por partido.',
      descLarga: 'La racha más imposible del béisbol y posiblemente de cualquier deporte. Durante 56 juegos seguidos, DiMaggio conectó al menos un hit por partido. Los estadísticos lo consideran estadísticamente el récord más improbable de la historia. Durante la racha, DiMaggio bateó .408 con 15 jonrones y 55 carreras impulsadas.',
      tag: 'Récord histórico', color: '#E6F1FB', tagBg: '#E6F1FB', tagColor: '#0C447C'
    },
    {
      icon: '🌵', anio: 'Serie Mundial 2001',
      titulo: 'Diamondbacks vs. Yankees — La serie más épica',
      desc: 'Siete juegos de drama puro semanas después del 11-S. Luis González conectó el hit de walkoff contra Rivera.',
      descLarga: 'Siete juegos de drama puro, semanas después del 11-S. Luis González conectó el hit de walkoff en el noveno inning del juego 7 contra Mariano Rivera, quien era prácticamente invencible. La Serie que unió y partió al país al mismo tiempo. Considerada por muchos la mejor Serie Mundial de todos los tiempos.',
      tag: 'Serie legendaria', color: '#E1F5EE', tagBg: '#E1F5EE', tagColor: '#085041'
    },
    {
      icon: '👑', anio: 'Dinastías inmortales',
      titulo: 'Los Yankees — El equipo más ganador de la historia',
      desc: '27 títulos de Serie Mundial, más que cualquier otra franquicia en cualquier deporte profesional norteamericano.',
      descLarga: '27 títulos de Serie Mundial. Las dinastías de 1949-53 (cinco seguidos), la de los años 60 con Mantle y Maris, y la de 1996-2000 con Jeter, Rivera y Pettitte son capítulos irremplazables en la historia deportiva mundial. La franquicia más valiosa y reconocida del béisbol.',
      tag: 'Equipo histórico', color: '#F1EFE8', tagBg: '#F1EFE8', tagColor: '#444441'
    },
    {
      icon: '🔮', anio: 'Serie Mundial 2004',
      titulo: 'La maldición del Bambino — 86 años de espera',
      desc: 'Los Red Sox remontaron un 0-3 histórico contra los Yankees para romper una maldición de 86 años.',
      descLarga: 'Los Red Sox de Boston, que no ganaban desde 1918, remontaron un 0-3 histórico en la ALCS contra los Yankees para después barrer a los Cardinals. La mayor remontada en la historia de los playoffs y el fin de una maldición de 86 años. David Ortiz fue el héroe con sus jonrones en extra innings.',
      tag: 'Momento mítico', color: '#FAECE7', tagBg: '#FAECE7', tagColor: '#712B13'
    },
    {
      icon: '⚡', anio: '8 de abril, 1974',
      titulo: 'Home run 715 — Hank Aaron supera a Babe Ruth',
      desc: 'Aaron conectó su jonrón 715 en Atlanta, superando el récord de Ruth que parecía eterno.',
      descLarga: 'En el cuarto inning en Atlanta, Aaron conectó su jonrón 715 contra Al Downing de los Dodgers. Dos fanáticos invadieron el campo para correr junto a él hasta el plato. Aaron recibió miles de cartas de odio durante meses, pero el béisbol nunca olvidará ese momento de historia civil y deportiva combinados.',
      tag: 'Récord histórico', color: '#EEEDFE', tagBg: '#EEEDFE', tagColor: '#3C3489'
    }
  ];

  modalJugador: Jugador | null = null;
  modalMomento: Momento | null = null;

  abrirModal(jugador: Jugador): void {
    this.modalJugador = jugador;
    document.body.style.overflow = 'hidden';
  }

  cerrarModal(): void {
    this.modalJugador = null;
    document.body.style.overflow = '';
  }

  abrirModalMomento(momento: Momento): void {
    this.modalMomento = momento;
    document.body.style.overflow = 'hidden';
  }

  cerrarModalMomento(): void {
    this.modalMomento = null;
    document.body.style.overflow = '';
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-section').forEach(el => {
      observer.observe(el);
    });
  }
}