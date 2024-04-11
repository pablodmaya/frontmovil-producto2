import { Component } from '@angular/core';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  standalone: true,
  selector: 'app_createPlayer_component',
  templateUrl: './createPlayer_component.component.html',
  styleUrls: ['./createPlayer_component.component.css']
})

export class CreatePlayerComponent {

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
      const fileType = this.imgFile.type;
      if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
        console.error("Invalid file type. Only PNG and JPEG images are allowed.");
        return;
      }
      this.imgRef = ref(this.storage, `assets/images/${this.imgFile.name}`);
      this.imgFileSelected = true;      
    }else{
      this.imgFile = undefined;
      this.imgRef = undefined;
      this.imgFileSelected = false;
    }
  }

  onFileVideoUpload($event: any){
    this.videoFile = $event.target.files[0];
    if(this.videoFile != undefined){
      const fileType = this.videoFile.type;
      if (fileType !== 'video/mp4') {
        console.error("Invalid file type. Only MP4 videos are allowed.");
        return;
      }
      this.videoRef = ref(this.storage, `assets/video/${this.videoFile.name}`);
      this.videoFileSelected = true;      
    }else{
      this.videoFile = undefined;
      this.videoRef = undefined;
      this.videoFileSelected = false;
    }
  }

  uploadImages(){
    if (!this.imgFile || !this.imgRef) {
      console.error("File or imgRef not available");
      return;
    }
    uploadBytes(this.imgRef, this.imgFile)
      .then(res => {
        console.log("Upload successful:", res);
        this.imgFile = undefined;
        this.imgRef = undefined;
        this.imgFileSelected = false;
      })
      .catch(e => console.error("Upload error:", e))
  }

  uploadVideo(){
    if (!this.videoFile || !this.videoRef) {
      console.error("File or imgRef not available");
      return;
    }
    uploadBytes(this.videoRef, this.videoFile)
      .then(res => {
        console.log("Upload successful:", res);
        this.videoFile = undefined;
        this.videoRef = undefined;
        this.videoFileSelected = false;
      })
      .catch(e => console.error("Upload error:", e))
  }
}