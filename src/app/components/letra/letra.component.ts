
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styleUrls: ['./letra.component.sass']
})
export class LetraComponent implements OnInit {
  @Input() palabra!: string;
  @Input() disabled: boolean = true;  // Nuevo input para manejar el estado deshabilitado
  @Input() letra!: string;
 
  public flip: boolean = false;
  public color: string = ''; // 1. igual Verde. 2. naranja. 3. gris
  public opcion: string = '';
  @Output() opcionCambiada = new EventEmitter<void>();

  constructor() { }

  ngOnInit() { }

  Verificar() {
    if (this.opcion === this.letra) {
      this.color = 'acierto';
    } else if (this.palabra.includes(this.opcion) && this.opcion !== this.letra) {
      this.color = 'casi';
    } else {
      this.color = 'fallo';
    }
    this.flip = true; // Activar la animación
    setTimeout(() => this.flip = false, 500)
  }

  getOpcion() {
    return this.opcion;
  }
}



  

  
  











