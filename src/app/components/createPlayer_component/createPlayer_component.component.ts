import { Component, EventEmitter, Output } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { addDoc } from 'firebase/firestore';

@Component({
  standalone: true,
  selector: 'app_createPlayer_component',
  templateUrl: './createPlayer_component.component.html',
  styleUrls: ['./createPlayer_component.component.css']
})

export class CreatePlayerComponent{
  allOk = false;
  namePlayer: string | undefined;
  surnamePlayer: string | undefined;
  agePlayer: number | undefined;
  positionPlayer: string | undefined;
  pointsPlayer: number | undefined;
  assistsPlayer: number | undefined;
  heightPlayer: number | undefined;
  imgURL: String | undefined;
  videoURL: String | undefined;  

  imgFile: File | undefined;
  videoFile: File | undefined;
  imgRef: any;
  videoRef: any;

  constructor(private storage: Storage, private firestore: Firestore) {}

  getName(event: Event) {
    this.namePlayer = (event.target as HTMLInputElement).value;
    this.actualizarAllOk();
  }
  
  getSurname(event: any){
    this.surnamePlayer = (event.target as HTMLInputElement).value;
    this.actualizarAllOk();
  }
  
  getAge(event: any){
    this.agePlayer = parseInt(event.target.value, 10);
    this.actualizarAllOk();
  }
  
  getPosition(event: any){
    this.positionPlayer = (event.target as HTMLInputElement).value;
    this.actualizarAllOk();
  }
  
  getPoints(event: any){
    this.pointsPlayer = parseInt(event.target.value, 10);
    this.actualizarAllOk();
  }
  
  getAssists(event: any){
    this.assistsPlayer = parseInt(event.target.value, 10);
    this.actualizarAllOk();
  }
  
  getHeight(event: any){
    this.heightPlayer = parseInt(event.target.value, 10);
    this.actualizarAllOk();
  }
  
  getImage(event: any){
    this.imgFile = event.target.files[0];
    if(this.imgFile != undefined){
      this.imgRef = ref(this.storage, `assets/images/${this.imgFile.name}`);  
    }else{
      this.imgFile = undefined;
      this.imgRef = undefined;
    }
    this.actualizarAllOk();
  }
  
  getVideo(event: any){
    this.videoFile = event.target.files[0];
    if(this.videoFile != undefined){
      this.videoRef = ref(this.storage, `assets/video/${this.videoFile.name}`);
    }else{
      this.videoFile = undefined;
      this.videoRef = undefined;
    }
    this.actualizarAllOk();
  }
  
  actualizarAllOk() {
    this.allOk = (
      this.namePlayer !== undefined &&
      this.surnamePlayer !== undefined &&
      this.agePlayer !== undefined &&
      this.positionPlayer !== undefined &&
      this.pointsPlayer !== undefined &&
      this.assistsPlayer !== undefined &&
      this.heightPlayer !== undefined &&
      this.imgFile !== undefined &&
      this.videoFile !== undefined
    );
  }

  async uploadPlayer() {
    if (!this.imgRef || this.imgFile === undefined) {
      console.error("Imagen no disponible");
      return;
    }
    if (!this.videoRef || this.videoFile === undefined) {
      console.error("Video no disponible");
      return;
    }
    try {
      //Subimos la imagen
      const imgBlob = this.imgFile;
      const imgSnapshot = await uploadBytesResumable(this.imgRef, imgBlob);
      this.imgURL = await getDownloadURL(imgSnapshot.ref);
      //Subimos el video
      const videoBlob = this.videoFile;
      const videoSnapshot = await uploadBytesResumable(this.videoRef, videoBlob);
      this.videoURL = await getDownloadURL(videoSnapshot.ref);
      //Subimos el jugador a la BBDD
      const playerCollection = collection(this.firestore, 'players');
      const playerData = {
          name: this.namePlayer,
          surname: this.surnamePlayer,
          age: this.agePlayer,
          position: this.positionPlayer,
          points: this.pointsPlayer,
          assists: this.assistsPlayer,
          height: this.heightPlayer,
          photo: this.imgURL,
          video: this.videoURL
      };
      addDoc(playerCollection, playerData);
    } catch (error) {
      console.error("Error al subir video o la imagen.", error);
      throw error;
    }
    this.closeCreatePlayer.emit(false);
  }
  
  @Output() closeCreatePlayer = new EventEmitter();
  closeCreatePlayerModal() {
    this.closeCreatePlayer.emit(false);
  }
}
