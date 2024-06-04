import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { LetraComponent } from '../letra/letra.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-palabra',
  templateUrl: './palabra.component.html',
  styleUrls: ['./palabra.component.sass']
})
export class PalabraComponent implements OnInit {

  @Input() letra!: string;
  @Input() palabra!: string;
  @Input() cont!: number;
  @Input() turno!: number;
  public letras!: string[];

  @ViewChildren(LetraComponent) letraComponents!: QueryList<LetraComponent>;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.letras = this.palabra.split('');
    console.log(this.letras);
  }
 

  VerificarPalabra() {
    let palabraIngresada = this.letraComponents.map(comp => comp.getOpcion()).join('');

    if (palabraIngresada.length < this.palabra.length) {
      return false; // No hacer nada si no se han ingresado todas las letras
    }
    let index = 0;
    const letraArray = this.letraComponents.toArray(); 
    // Crea un intervalo que verifica cada componente uno por uno con un retraso de 500 ms
    const intervalId = setInterval(() => {  // Verifica si el índice actual es menor que la longitud del array de componentes
      if (index < letraArray.length) { // Llama al método Verificar en el componente actual
        letraArray[index].Verificar();
        index++;
      } else {
        clearInterval(intervalId);  // Si todos los componentes han sido verificados, detiene el intervalo
      }
    }, 500); // Retraso de 500 ms entre cada verificación
    
    if (palabraIngresada === this.palabra) {
      return true;
    } 
    return false;
  }

  get isCurrentTurn(): boolean {
    return this.cont === this.turno;
  }

  allLettersFilled(): boolean {
    return this.letraComponents.toArray().every(comp => comp.getOpcion().length > 0);
  }
}