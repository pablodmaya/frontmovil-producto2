import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FirestoreModule, provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { ageFilterPipe } from './pipes/age.filter.pipe'; // Importa tu pipe aquí
import { nameFilterPipe } from './pipes/name.filter.pipe'; // Importa el nuevo pipe aquí
import { positionFilterPipe } from './pipes/position.filter.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ageFilterPipe, // Declara tu pipe aquí
    nameFilterPipe,
    positionFilterPipe
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    //BrowserModule,
    CommonModule,
    FirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    provideStorage(() => getStorage()),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ageFilterPipe, nameFilterPipe, positionFilterPipe],
})
export class AppModule { }