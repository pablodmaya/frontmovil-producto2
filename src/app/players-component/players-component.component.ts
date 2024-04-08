import { Component } from '@angular/core';
import { NgIf, NgFor, UpperCasePipe, CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Player } from '../player';
import { PLAYERS } from '../data/players';
import { DetailComponent } from '../detail-component/detail-component.component';
import { PlayerComponentComponent } from '../player-component/player-component.component';
import { AppModule } from '../app.module';

import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


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
    CommonModule
  ],
})
export class PlayersComponentComponent {

 // players = PLAYERS;
 
 public player$: Observable<any[]>;
 firestore: Firestore = inject(Firestore);

 constructor() {
   const playersCollection = collection(this.firestore, 'players');
   this.player$ = collectionData(playersCollection);
 }
 
 selectedPlayer?: Player;
  filterage: string = '';
  filtername: string = '';
  filterposition: string = '';
  positions: string[] = ["Base", "Escolta", "Alero", "Pivot"];
}  
