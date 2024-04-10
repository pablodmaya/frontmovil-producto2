import { Component } from '@angular/core';
import { NgIf, NgFor, UpperCasePipe, CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Player } from '../../interface/player';
import { DetailComponent } from '../detail_component/detail_component.component';
import { PlayerComponent } from '../player_component/player_component.component';
import { AppModule } from '../../app.module';

import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


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
    CommonModule
  ],
})
export class PlayersListComponent {

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
