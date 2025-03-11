import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripNoteComponent } from './trip-note.component';

describe('TripNoteComponent', () => {
  let component: TripNoteComponent;
  let fixture: ComponentFixture<TripNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripNoteComponent,]
    })
    .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(TripNoteComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
