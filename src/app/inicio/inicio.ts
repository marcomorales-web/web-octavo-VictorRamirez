import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio {

}