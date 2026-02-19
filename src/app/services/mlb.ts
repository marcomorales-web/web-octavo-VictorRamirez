import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

    //API PARA EQUIPOS DE MLB
// https://statsapi.mlb.com/api/v1/teams?sportId=1


    //JUEGOS DE UN DIA EN ESPECIFICO
//https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=2026-02-19



export class MlbService {
  private baseUrl = 'https://statsapi.mlb.com/api/v1';

  constructor(private http: HttpClient) {}

  obtenerJuegosPorFecha(fecha: string) {
    return this.http.get(`${this.baseUrl}/schedule?sportId=1&date=${fecha}`);
  }
}