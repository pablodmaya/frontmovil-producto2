import { Component, EventEmitter, Output } from '@angular/core';
import { Storage, listAll, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  standalone: true,
  selector: 'app_createPlayer_component',
  templateUrl: './createPlayer_component.component.html',
  styleUrls: ['./createPlayer_component.component.css']
})

export class CreatePlayerComponent{

  imgFileSelected = false;
  videoFileSelected = false;
  imgFile: File | undefined;
  videoFile: File | undefined;
  imgRef: any;
  videoRef: any;

  constructor(private storage: Storage) {}
  
  onFileImgUpload($event: any){
    this.imgFile = $event.target.files[0];
    if(this.imgFile != undefined){
      this.imgRef = ref(this.storage, `assets/images/${this.imgFile.name}`);  
    }else{
      this.imgFile = undefined;
      this.imgRef = undefined;
    }
  }

  onFileVideoUpload($event: any){
    this.videoFile = $event.target.files[0];
    if(this.videoFile != undefined){
      this.videoRef = ref(this.storage, `assets/video/${this.videoFile.name}`);
    }else{
      this.videoFile = undefined;
      this.videoRef = undefined;
    }
  }

  uploadImages(){
    if (!this.imgFile || !this.imgRef) {
      console.error("File or imgRef not available");
      return;
    }
    uploadBytes(this.imgRef, this.imgFile)
      .then(res => {
        console.log("Imagen subida con exito.", res);
        this.imgFile = undefined;
        this.imgRef = undefined;
        this.imgFileSelected = false;
      })
      .catch(e => console.error("Fallo al subir la imagen: ", e))
  }

  uploadVideo(){
    if (!this.videoFile || !this.videoRef) {
      console.error("File or imgRef not available");
      return;
    }
    uploadBytes(this.videoRef, this.videoFile)
      .then(res => {
        console.log("Video subido con exito.", res);
        this.videoFile = undefined;
        this.videoRef = undefined;
        this.videoFileSelected = false;
      })
      .catch(e => console.error("Fallo al subir el video: ", e))
  }

  @Output() closeCreatePlayer = new EventEmitter();

  closeCreatePlayerModal() {
    this.closeCreatePlayer.emit(false);
  }
}