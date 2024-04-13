import { Component, Input } from '@angular/core';
import { PlayerInterface } from '../../interfaces/playerInterface';
import { DetailComponent } from '../detail_component/detail_component.component';
import { NgIf, NgFor, UpperCasePipe } from '@angular/common';
//Borrado
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';
import {
  Storage,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { addDoc } from 'firebase/firestore';
import { from } from 'rxjs';

@Component({
  selector: 'app_player_component',
  standalone: true,
  templateUrl: './player_component.component.html',
  template: `
    <div *ngFor="let player of filteredPlayers">
      <!-- Aquí coloca tu estructura para mostrar cada jugador -->
      <p>{{ player.name }} - {{ player.age }}</p>
    </div>
  `,
  styleUrl: './player_component.component.css',
  imports: [
    DetailComponent,
    NgIf,
    NgFor,
    UpperCasePipe,
    DetailComponent,
    PlayerComponent,
  ],
})
export class PlayerComponent {
  //borrado
  constructor(private storage: Storage, private firestore: Firestore) {}

  open: boolean = false;
  play: boolean = false;
  @Input() player?: PlayerInterface; //Esto significa que el valor de esta propiedad puede ser pasado
  //a esta componente desde el componente padre. El ? al final de
  //PlayerInterface?: PlayerInterface significa que PlayerInterface es opcional y puede ser undefined.
  onSelect(): void {
    this.open = !this.open;
  }
  @Input() filteredPlayers: PlayerInterface[] = [];

  //@Input() player2: PlayerInterface[] = [];

  async onDelete(player: PlayerInterface) {
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
  }
}
