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

  videoPaused = true;
  videoMuted = false;

  progressBar: number = 0;
  durationVideo: string = '00:00:00';
  currentTime: string = '00:00:00';
  
  audioLevel: number = 0;
  setTime(data: any) {
      this.currentTime = this.formatTime(data.target.currentTime);
      this.durationVideo = this.formatTime(data.target.duration);
      this.progressBar = data.target.currentTime/data.target.duration*100;
  }
  formatTime(timeInSeconds: number): string {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      const formattedHours = hours < 10 ? "0" + hours : hours;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  backTimeVideo(){
    const currentTime = this.media.nativeElement.currentTime;
    const newTime = currentTime - 10;
    if (newTime >= 0) {
      this.media.nativeElement.currentTime = newTime;
    }else{
      this.media.nativeElement.currentTime = 0;
    }
  }
  playPauseVideo() {
    this.videoPaused = !this.videoPaused;
    if(!this.videoPaused){
      this.media.nativeElement.play();
    }else{
      this.media.nativeElement.pause();
    }
  }
  passTimeVideo(){
    const currentTime = this.media.nativeElement.currentTime;
    const newTime = currentTime + 10;
    if (newTime <= this.media.nativeElement.duration) {
      this.media.nativeElement.currentTime = newTime;
    }else{
      this.media.nativeElement.currentTime = 0;
      this.media.nativeElement.pause();
      this.videoPaused = true;
    }
  }
  stopVideo(){
    this.videoPaused = true;
    this.media.nativeElement.currentTime = 0;
    this.media.nativeElement.pause();
  }
  setAudioLevel(event: any) {
    if (this.media.nativeElement) {
      this.media.nativeElement.volume = event.target.value;
      this.audioLevel = event.target.value;
    }
    if(event.target.value == 0){
      this.videoMuted = true;
    }else{
      this.videoMuted = false;
    }
  }
  mutedVideo(){
    this.videoMuted = !this.videoMuted;
    if(this.videoMuted){
      this.media.nativeElement.volume = 0;
    }else{
      this.media.nativeElement.volume = this.audioLevel;
    }
  }
  closeMediaModal() {
    this.closeMedia.emit(false);
  }
}