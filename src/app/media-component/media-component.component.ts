import {Component, Input} from '@angular/core';
import {NgIf, UpperCasePipe} from '@angular/common';
import { Player } from '../player';

@Component({
  standalone: true,
  selector: 'app-media-component',
  templateUrl: './media-component.component.html',
  styleUrls: ['./media-component.component.css'],
  imports: [ NgIf, UpperCasePipe],
})
export class MediaComponentComponent {
  @Input() player?: Player;
}