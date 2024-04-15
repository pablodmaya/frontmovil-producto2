import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerInterface } from '../../interfaces/playerInterface';
import { MediaComponentComponent } from '../media_component/media_component.component';
import { EditPlayerComponent } from "../editPlayer_component/editPlayer_component.component";
import { Firestore,collection,query,where,getDocs,doc,deleteDoc } from '@angular/fire/firestore';
import { Storage,deleteObject,ref } from '@angular/fire/storage';

@Component({
    standalone: true,
    selector: 'app_deletePlayer_component',
    templateUrl: './deletePlayer_component.component.html',
    styleUrls: ['./deletePlayer_component.component.css'],
    imports: [FormsModule, NgIf, UpperCasePipe, MediaComponentComponent, EditPlayerComponent]
})

export class DeletePlayerComponent {
  constructor(private storage: Storage, private firestore: Firestore) {}
  blueButtonPress: boolean = false;
  @Input() player?: PlayerInterface;
  async onDelete(player: PlayerInterface) {
    this.blueButtonPress = true;
    console.log('Borrando jugador:', player);
    // Aquí puedes realizar las operaciones de eliminación del jugador
    try {
      const querySnapshot = await getDocs(
        query(
          collection(this.firestore, 'players'),
          where('name', '==', player.name),
          where('surname', '==', player.surname)
        )
      );
      if (!querySnapshot.empty) {
        const docToDelete = querySnapshot.docs[0];
        // Obtener la URL de la imagen del jugador
        const imageURL = player.photo;
        // Obtener la referencia a la imagen en Firebase Storage
        const imageRef = ref(this.storage, imageURL);
        console.log(imageRef);
        // Borrar la imagen
        await deleteObject(imageRef)
          .then(() => {
            console.log('La imagen se ha borrado correctamente.');
          })
          .catch((error) => {
            console.error('Error al borrar la imagen:', error);
          });
        // Obtener la URL del vídeo del jugador
        const videoURL = player.video;
        // Obtener la referencia al vídeo en Firebase Storage
        const videoRef = ref(this.storage, videoURL);
        // Borrar el vídeo
        await deleteObject(videoRef)
          .then(() => {
            console.log('El vídeo se ha borrado correctamente.');
          })
          .catch((error) => {
            console.error('Error al borrar el vídeo:', error);
          });

         await deleteDoc(doc(this.firestore, 'players', docToDelete.id))
         .then(() => {
          console.log('El jugador se ha borrado correctamente.');
        })
        .catch((error) => {
          console.error('Error al borrar el jugador', error);
        });
      } else {
        console.log('No se encontró ningún jugador con ese nombre y apellido.');
      }
    } catch (error) {
      console.error('Error al eliminar el jugador:', error);
    }
    this.closeDeletePlayerOutput.emit(false);
  }

  @Output() closeDeletePlayerOutput = new EventEmitter();
  closeDeletePlayer() {
    this.closeDeletePlayerOutput.emit(false);
  }
}