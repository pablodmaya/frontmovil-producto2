import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ageFilterPipe } from './pipes/age.filter.pipe'; // Importa tu pipe aquí
import { nameFilterPipe } from './pipes/name.filter.pipe'; // Importa el nuevo pipe aquí
import { DetailComponent } from './detail-component/detail-component.component';
import { PlayerComponentComponent } from './player-component/player-component.component';
import { MediaComponentComponent } from './media-component/media-component.component';
import { positionFilterPipe } from './pipes/position.filter.pipe';

@NgModule({
  declarations: [
    ageFilterPipe, // Declara tu pipe aquí
    nameFilterPipe,
    positionFilterPipe
  ],
  providers: [],
  bootstrap: [],
  exports: [
    ageFilterPipe,
    nameFilterPipe,
    positionFilterPipe
  ]  
})
export class AppModule { }
