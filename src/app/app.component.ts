import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayersListComponent } from './components/playersList_component/playersList_component.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, PlayersListComponent]
})
export class AppComponent {
  //title = 'team basket';
}
