import { Component, Input } from '@angular/core';
import { NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerInterface } from '../../interfaces/playerInterface';
import { MediaComponentComponent } from '../media_component/media_component.component';
import { CreatePlayerComponentComponent } from '../createPlayer_component/createPlayer_component.component';

@Component({
  standalone: true,
  selector: 'app_detail_component',
  templateUrl: './detail_component.component.html',
  styleUrls: ['./detail_component.component.css'],
  imports: [FormsModule,NgIf,UpperCasePipe,CreatePlayerComponentComponent,MediaComponentComponent,],
})

export class DetailComponent {
  play: boolean = false;
  @Input() player?: PlayerInterface;
  playVideo(): void{
    this.play = !this.play;
  }
}
 