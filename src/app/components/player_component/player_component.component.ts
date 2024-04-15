import { Component, Input } from '@angular/core';
import { PlayerInterface } from '../../interfaces/playerInterface';
import { DetailComponent } from '../detail_component/detail_component.component';
import { NgIf, NgFor, UpperCasePipe } from '@angular/common';
import { DeletePlayerComponent } from "../deletePlayer_component/deletePlayer_component.component";

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
    imports: [
        DetailComponent,
        NgIf,
        NgFor,
        UpperCasePipe,
        DetailComponent,
        PlayerComponent,
        DeletePlayerComponent
    ]
})
export class PlayerComponent {
  detailOpen: boolean = false;
  deletePlayer: boolean = false;
  play: boolean = false;
  @Input() player?: PlayerInterface;
  onDetail(): void {
    this.detailOpen = !this.detailOpen;
  }
  onDelete(): void{
    this.deletePlayer = !this.deletePlayer;
  }
}