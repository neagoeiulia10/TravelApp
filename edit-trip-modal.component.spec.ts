import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTripModalComponent } from './edit-trip-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('EditTripModalComponent', () => {
  let component: EditTripModalComponent;
  let fixture: ComponentFixture<EditTripModalComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTripModalComponent,BrowserAnimationsModule,NoopAnimationsModule],
      providers:[ 
        { provide: MatDialogRef,useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {} }]
      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTripModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
