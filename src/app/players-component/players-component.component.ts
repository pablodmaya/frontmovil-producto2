import { Component } from '@angular/core';
import { NgIf, NgFor, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Player } from '../player';
import { PLAYERS } from '../data/players';
import { DetailComponent } from '../detail-component/detail-component.component';
import { PlayerComponentComponent } from '../player-component/player-component.component';
import { AppModule } from '../app.module';

@Component({
  standalone: true,
  selector: 'app-players-component',
  templateUrl: './players-component.component.html',
  styleUrl: './players-component.component.css',
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    DetailComponent,
    PlayerComponentComponent,
    AppModule,
  ],
})
export class PlayersComponentComponent {

  crearJugador() {
    throw new Error('Method not implemented.');
    }

  players = PLAYERS;
  selectedPlayer?: Player;
  filterage: string = '';
  filtername: string = '';
  filterposition: string = '';
  positions: string[] = ["Base", "Escolta", "Alero", "Pivot"];
}  
