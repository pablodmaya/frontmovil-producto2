import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgIf, UpperCasePipe} from '@angular/common';
import { PlayerInterface } from '../../interfaces/playerInterface';

@Component({
  standalone: true,
  selector: 'app_media_component',
  templateUrl: './media_component.component.html',
  styleUrls: ['./media_component.component.css'],
  imports: [ NgIf, UpperCasePipe],
})

export class MediaComponentComponent {
  
  @Input() player?: PlayerInterface;
  @Output() closeMedia = new EventEmitter();
  @ViewChild('media') media!: ElementRef;
  playVid() {
    this.media.nativeElement.play();
  }
  pauseVid() {
    this.media.nativeElement.pause();
  }
  closeMediaModal() {
    this.closeMedia.emit(false);
  }
}