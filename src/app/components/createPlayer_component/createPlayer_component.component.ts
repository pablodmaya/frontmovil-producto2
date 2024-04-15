import { Component, EventEmitter, Output } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { addDoc } from 'firebase/firestore';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app_createPlayer_component',
  templateUrl: './createPlayer_component.component.html',
  styleUrls: ['./createPlayer_component.component.css'],
  imports: [NgIf,ReactiveFormsModule]
})

export class CreatePlayerComponent{
  @Output() closeCreatePlayer = new EventEmitter();

  form!: FormGroup;
  formCompleted: boolean = false;
  blueButtonPress: boolean = false;
  imgFile: File | undefined;
  videoFile: File | undefined;
  imgRef: any;
  videoRef: any;  
  imgURL: String | undefined;
  videoURL: String | undefined;  
  constructor(private storage: Storage, private firestore: Firestore) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      placeOfBirth: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      lastTeam: new FormControl('', Validators.required),
      lastLeagueSport: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      points: new FormControl('', Validators.required),
      assists: new FormControl('', Validators.required),
      height: new FormControl('', Validators.required),
      onFileImgUpload: new FormControl('', Validators.required),
      onFileVideoUpload: new FormControl('', Validators.required)
    });
  }

  //Generador de ID unico para jugador
  generateUniqueId(): string {
    const timestamp = new Date().getTime();
    return timestamp.toString(16);
  }

  getImage(event: any){
    this.imgFile = event.target.files[0];
    if(this.imgFile != undefined){
      this.imgRef = ref(this.storage, `assets/images/${this.imgFile.name}`);  
    }else{
      this.imgFile = undefined;
      this.imgRef = undefined;
    }
  }
  
  getVideo(event: any){
    this.videoFile = event.target.files[0];
    if(this.videoFile != undefined){
      this.videoRef = ref(this.storage, `assets/video/${this.videoFile.name}`);
    }else{
      this.videoFile = undefined;
      this.videoRef = undefined;
    }
  }

  //Comprobación de inputs
  checkInputs() {
    if (this.form.valid) {
      this.formCompleted = true;
    } else {
      this.formCompleted = false;
    }
  }
  //Subir jugador a la base de datos.
  async uploadPlayer() {
    this.blueButtonPress = true;
    if (!this.imgRef || this.imgFile === undefined) {
      alert("Imagen no disponible");
      this.closeCreatePlayer.emit(false);
      return;
    }
    if (!this.videoRef || this.videoFile === undefined) {
      alert("Video no disponible");
      this.closeCreatePlayer.emit(false);
      return;
    }
    //Subimos los datos
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
          id: this.generateUniqueId(),
          name: this.form.get('name')?.value,
          surname: this.form.get('surname')?.value,
          age: this.form.get('age')?.value,
          placeOfBirth: this.form.get('placeOfBirth')?.value,
          position: this.form.get('position')?.value,
          lastTeam: this.form.get('lastTeam')?.value,
          lastLeagueSport: this.form.get('lastLeagueSport')?.value,
          points: this.form.get('points')?.value,
          assists: this.form.get('assists')?.value,
          height: this.form.get('height')?.value,
          photo: this.imgURL,
          video: this.videoURL
      };
      addDoc(playerCollection, playerData);
    } catch (error) {
      alert("Error al crear el objeto del jugador: " + error);
    }finally{
      this.closeCreatePlayer.emit(false);
    }
  }
  closeCreatePlayerModal() {
    this.closeCreatePlayer.emit(false);
  }
}