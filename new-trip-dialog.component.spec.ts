import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTripDialogComponent } from './new-trip-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgModel } from '@angular/forms';

describe('NewTripDialogComponent', () => {
  let component: NewTripDialogComponent;
  let fixture: ComponentFixture<NewTripDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTripDialogComponent, MatDialogModule],
      providers:[ 
        { provide: MatDialogRef,useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();
  });
  
  it('should create', () => {
    fixture = TestBed.createComponent(NewTripDialogComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
