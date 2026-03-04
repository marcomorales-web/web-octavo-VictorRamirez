//Importamos HttpCliente para hacer peticiones, con eso podemos hacer GET a la API de la mlb
// para traer los resultados
import { HttpClient } from '@angular/common/http';

//Injectable sirve para decirle a angular que podra ser injectada en otros componentes
import { Injectable } from '@angular/core';

// Este servicio estara disponible en toda la aplicacion
// y angular lo creara automatico cunado alguien lo necesite
@Injectable({
  providedIn: 'root'
})

    //API PARA EQUIPOS DE MLB
// https://statsapi.mlb.com/api/v1/teams?sportId=1


    //JUEGOS DE UN DIA EN ESPECIFICO
//https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=2026-02-19

export class MlbService {
  private baseUrl = 'https://statsapi.mlb.com/api/v1';
  private baseUrlV11 = 'https://statsapi.mlb.com/api/v1.1';

  constructor(private http: HttpClient) {}


  obtenerJuegosPorFecha(fecha: string) {
    return this.http.get(`${this.baseUrl}/schedule?sportId=1&date=${fecha}`); // Devuelve un observable
  };

  obtenerDetalleJuego(gamePk: number) {
    return this.http.get(`${this.baseUrlV11}/game/${gamePk}/feed/live`);
  }
}