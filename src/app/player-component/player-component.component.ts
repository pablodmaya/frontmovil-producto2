import { Component, Input } from '@angular/core';
import { Player } from '../player';
import { DetailComponent } from "../detail-component/detail-component.component";
import {
  NgIf,
  NgFor,
  UpperCasePipe,
} from '@angular/common';



@Component({
    selector: 'app-player-component',
    standalone: true,
    templateUrl: './player-component.component.html',
    template: `
    <div *ngFor="let player of filteredPlayers">
      <!-- Aquí coloca tu estructura para mostrar cada jugador -->
      <p>{{ player.name }} - {{ player.age }}</p>
    </div>
  `,    
    styleUrl: './player-component.component.css',
    imports: [DetailComponent,
      NgIf,
      NgFor,
      UpperCasePipe,
      DetailComponent,
      PlayerComponentComponent,
    ],
})
export class PlayerComponentComponent {
  open:boolean = false;
  play:boolean = false;
  @Input() player?: Player; //Esto significa que el valor de esta propiage puede ser pasado 
                            //a esta componente desde el componente padre. El ? al final de 
                            //player?: Player significa que player es opcional y puede ser undefined.
  
  onSelect(): void {
    this.open = !this.open;
  }  

  @Input() filteredPlayers: Player[] = [];

}
