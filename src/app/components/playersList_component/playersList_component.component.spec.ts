import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersListComponent } from './playersList_component.component';

describe('PlayersComponentComponent', () => {
  let component: PlayersListComponent;
  let fixture: ComponentFixture<PlayersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
