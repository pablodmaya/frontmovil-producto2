import { Component, Input } from '@angular/core';
import { Player } from '../../interface/player';
import { DetailComponent } from "../detail_component/detail_component.component";
import { NgIf, NgFor, UpperCasePipe } from '@angular/common';

@Component({
    selector: 'app_player_component',
    standalone: true,
    templateUrl: './player_component.component.html',
    template: `
    <div *ngFor="let player of filteredPlayers">
      <!-- Aquí coloca tu estructura para mostrar cada jugador -->
      <p>{{ player.name }} - {{ player.age }}</p>
    </div>
  `,    
    styleUrl: './player_component.component.css',
    imports: [DetailComponent,
      NgIf,
      NgFor,
      UpperCasePipe,
      DetailComponent,
      PlayerComponent,
    ],
})
export class PlayerComponent {
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
