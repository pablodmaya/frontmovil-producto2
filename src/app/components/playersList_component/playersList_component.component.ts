import { Component } from '@angular/core';
import { NgIf, NgFor, UpperCasePipe, CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlayerInterface } from '../../interfaces/playerInterface';
import { DetailComponent } from '../detail_component/detail_component.component';
import { PlayerComponent } from '../player_component/player_component.component';
import { AppModule } from '../../app.module';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CreatePlayerComponent } from '../createPlayer_component/createPlayer_component.component';

@Component({
  standalone: true,
  selector: 'app_playersList_component',
  templateUrl: './playersList_component.component.html',
  styleUrl: './playersList_component.component.css',
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    DetailComponent,
    PlayerComponent,
    AppModule,
    CommonModule,
    CreatePlayerComponent,
  ],
})
export class PlayersListComponent {
  createPlayer = false;
  public player$: Observable<any[]>;
  selectedPlayer?: PlayerInterface;
  filterage: string = '';
  filtername: string = '';
  filterposition: string = '';
  positions: string[] = ["Base", "Escolta", "Alero", "Pivot"];

  constructor(private firestore: Firestore) {
    const playersCollection = collection(this.firestore, 'players');
    this.player$ = collectionData(playersCollection);
  }
  
  createPlayerModal(): void {
    this.createPlayer = !this.createPlayer;
  }  
}