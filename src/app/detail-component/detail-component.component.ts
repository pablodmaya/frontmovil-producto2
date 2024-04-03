import { Component, Input } from '@angular/core';
import { NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Player } from '../player';
import { MediaComponentComponent } from '../media-component/media-component.component';

@Component({
  standalone: true,
  selector: 'app-detail-component',
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.css'],
  imports: [FormsModule, NgIf, UpperCasePipe,MediaComponentComponent,],
})
export class DetailComponent {
  play: boolean = false;
  @Input() player?: Player;
  playVideo(): void{
    this.play = !this.play;
  }
}
 