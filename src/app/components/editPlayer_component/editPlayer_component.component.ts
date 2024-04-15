import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { Storage, deleteObject, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { PlayerInterface } from '../../interfaces/playerInterface';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app_editPlayer_component',
  templateUrl: './editPlayer_component.component.html',
  styleUrls: ['./editPlayer_component.component.css'],
  imports: [NgIf]
})

export class EditPlayerComponent{
  @Input() player?: PlayerInterface;
  @Output() closeEdit = new EventEmitter();

  imageCheckbox: boolean = false;
  videoCheckbox: boolean = false;

  formCompleted: boolean = false;
  blueButtonPress: boolean = false;

  namePlayer: string | undefined;
  surnamePlayer: string | undefined;
  placeOfBirthPlayer: string | undefined;
  agePlayer: number | undefined;
  positionPlayer: string | undefined;
  lastTeamPlayer: string | undefined;
  leagueSportsPlayer: string | undefined;
  pointsPlayer: number | undefined;
  assistsPlayer: number | undefined;
  heightPlayer: number | undefined;
  imgURL: String | undefined;
  videoURL: String | undefined;

  @ViewChild('name') name!: ElementRef;
  @ViewChild('surname') surname!: ElementRef;
  @ViewChild('placeOfBirth') placeOfBirth!: ElementRef;
  @ViewChild('age') age!: ElementRef;
  @ViewChild('position') position!: ElementRef;
  @ViewChild('lastTeam') lastTeam!: ElementRef;
  @ViewChild('lastLeagueSport') lastLeagueSport!: ElementRef;
  @ViewChild('points') points!: ElementRef;
  @ViewChild('assists') assists!: ElementRef;
  @ViewChild('height') height!: ElementRef;
  @ViewChild('onFileImgUpload') onFileImgUpload!: ElementRef;
  @ViewChild('onFileVideoUpload') onFileVideoUpload!: ElementRef;

  imgFile: File | undefined;
  videoFile: File | undefined;
  imgRef: any;
  videoRef: any;

  constructor(private storage: Storage, private firestore: Firestore) {
    this.name = {} as ElementRef;
    this.surname = {} as ElementRef;
    this.placeOfBirth = {} as ElementRef;
    this.age = {} as ElementRef;
    this.position = {} as ElementRef;
    this.lastTeam = {} as ElementRef;
    this.lastLeagueSport = {} as ElementRef;
    this.points = {} as ElementRef;
    this.assists = {} as ElementRef;
    this.height = {} as ElementRef;
    this.onFileImgUpload = {} as ElementRef;
    this.onFileVideoUpload = {} as ElementRef;
  }

 
  uploadData(){
    this.namePlayer = this.name.nativeElement.value;
    this.surnamePlayer = this.surname.nativeElement.value;
    this.placeOfBirthPlayer = this.placeOfBirth.nativeElement.value;
    this.agePlayer = this.age.nativeElement.value;
    this.positionPlayer = this.position.nativeElement.value;
    this.lastTeamPlayer = this.lastTeam.nativeElement.value;
    this.leagueSportsPlayer = this.lastLeagueSport.nativeElement.value;
    this.pointsPlayer = this.points.nativeElement.value;
    this.assistsPlayer = this.assists.nativeElement.value;
    this.heightPlayer = this.height.nativeElement.value;
    this.actualizarAllOk();
  }

  onImageCheckChange(checked: boolean) {
    this.imageCheckbox = checked;
    this.onFileImgUpload.nativeElement.disabled = !checked;
  }

  onVideoCheckChange(checked: boolean) {
    this.videoCheckbox = checked;
    this.onFileVideoUpload.nativeElement.disabled = !checked;
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
    this.formCompleted = (
      this.namePlayer !== undefined &&
      this.surnamePlayer !== undefined &&
      this.placeOfBirthPlayer !== undefined &&
      this.agePlayer !== undefined &&
      this.lastTeamPlayer !== undefined &&
      this.leagueSportsPlayer !== undefined &&
      this.positionPlayer !== undefined &&
      this.pointsPlayer !== undefined &&
      this.assistsPlayer !== undefined &&
      this.heightPlayer !== undefined &&
      (this.imageCheckbox ? (this.imgFile !== undefined ? true : false) : true) &&
      (this.videoCheckbox ? (this.videoFile !== undefined ? true : false) : true)
    );
  }

  async uploadPlayer() {
    this.blueButtonPress = true;
    try {
      //Eliminamos la imagen antigua y subimos la nueva si el usuario quiere cambiarla
      if(this.imageCheckbox){
        if (!this.imgRef || this.imgFile === undefined) {
          alert("Imagen no disponible");
          this.closeEdit.emit(false);
          return;
        }
        // Obtener la referencia a la imagen en Firebase Storage
        const imageURL = this.player?.photo;
        const imageRef = ref(this.storage, imageURL);
        // Borrar la imagen
        await deleteObject(imageRef)
        .then(() => {
          console.log('La imagen se ha borrado correctamente.');
        })
        .catch((error) => {
          console.error('Error al borrar la imagen:', error);
        });
        //Subimos la nueva
        const imgBlob = this.imgFile;
        const imgSnapshot = await uploadBytesResumable(this.imgRef, imgBlob);
        this.imgURL = await getDownloadURL(imgSnapshot.ref);
      }
      //Eliminamos el video antiguo y subimos la nuevo si el usuario quiere cambiarla
      if(this.videoCheckbox){
        if (!this.videoRef || this.videoFile === undefined) {
          alert("Video no disponible");
          this.closeEdit.emit(false);
          return;
        }
        // Obtener la URL del vídeo del jugador
        const videoURL = this.player?.video;
        const videoRef = ref(this.storage, videoURL);
        // Borrar el vídeo
        await deleteObject(videoRef)
        .then(() => {
          console.log('El vídeo se ha borrado correctamente.');
        })
        .catch((error) => {
          console.error('Error al borrar el vídeo:', error);
        });
        const videoBlob = this.videoFile;
        const videoSnapshot = await uploadBytesResumable(this.videoRef, videoBlob);
        this.videoURL = await getDownloadURL(videoSnapshot.ref);        
      }
      const collectionRef = collection(this.firestore, 'players');
      const playerDocRef = doc(collectionRef, this.player?.id);
      getDoc(playerDocRef).then((doc) => {
        if (doc.exists()) {
          console.log("Document data:", doc.data());
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
      const playerData = {
        name: this.namePlayer,
        surname: this.surnamePlayer,
        placeOfBirth: this.placeOfBirthPlayer,
        age: this.agePlayer,
        position: this.positionPlayer,
        lastTeam: this.lastTeamPlayer,
        lastLeagueSport: this.leagueSportsPlayer,
        points: this.pointsPlayer,
        assists: this.assistsPlayer,
        height: this.heightPlayer,
        photo: this.imgURL,
        video: this.videoURL
      };
      // Check if the player already exists
      const playerSnapshot = await getDoc(playerDocRef);
      if (playerSnapshot.exists()) {
        await updateDoc(playerDocRef, playerData);
        console.log('Jugador actualizado con exito!');
      } else {
        console.error('El jugador no existe!' + this.player?.id);
      }
    } catch (error) {
      console.error("Error al actualizar el jugador.", error);
      throw error;
    } finally{
    this.closeEdit.emit(false);      
    }
  }
  
  
  closeEditPlayerModal() {
    this.closeEdit.emit(false);
  }
}
