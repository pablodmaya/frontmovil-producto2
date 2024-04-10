import { Component } from '@angular/core';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  standalone: true,
  selector: 'app_createPlayer_component',
  templateUrl: './createPlayer_component.component.html',
  styleUrls: ['./createPlayer_component.component.css']
})

export class CreatePlayerComponentComponent {
  constructor(private storage: Storage) {} // Assuming you inject Storage in constructor

  uploadImage($event: any){
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `assets/images/${file.name}`);
    uploadBytes(imgRef, file)
    .then(res => console.log(res))
    .catch(e => console.log(e))
  }
}
