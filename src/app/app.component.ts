import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayersComponentComponent } from "./players-component/players-component.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, PlayersComponentComponent]
})
export class AppComponent {
  //title = 'team basket';
}
