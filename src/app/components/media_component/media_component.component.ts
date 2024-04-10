import {Component, Input} from '@angular/core';
import {NgIf, UpperCasePipe} from '@angular/common';
import { Player } from '../../interface/player';

@Component({
  standalone: true,
  selector: 'app_media_component',
  templateUrl: './media_component.component.html',
  styleUrls: ['./media_component.component.css'],
  imports: [ NgIf, UpperCasePipe],
})

export class MediaComponentComponent {
  @Input() player?: Player;
}