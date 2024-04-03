import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersComponentComponent } from './players-component.component';

describe('PlayersComponentComponent', () => {
  let component: PlayersComponentComponent;
  let fixture: ComponentFixture<PlayersComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
