import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TripNote } from '../trip-note.model';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-new-trip-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatIcon,
  ],
  providers: [provideNativeDateAdapter(), MatDatepickerModule,],
  template: `
   <h1 mat-dialog-title>New Trip</h1>
<div mat-dialog-content>
  <form [formGroup]="tripForm">
    <mat-form-field>
      <mat-label>Place</mat-label>
      <input matInput formControlName="place">
      <mat-error *ngIf="tripForm.get('place')?.hasError('required')">
        Place is required
      </mat-error>
    </mat-form-field>
    <mat-form-field>
      <mat-label>From Date</mat-label>
      <input matInput [matDatepicker]="picker1" formControlName="dateFrom">
      <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
      <mat-datepicker #picker1></mat-datepicker>
      <mat-error *ngIf="tripForm.get('dateFrom')?.hasError('required')">
        From Date is required
      </mat-error>
      <mat-error *ngIf="tripForm.get('dateFrom')?.hasError('invalidDate')">
        Invalid date
      </mat-error>
    </mat-form-field>
    <mat-form-field>
      <mat-label>To Date</mat-label>
      <input matInput [matDatepicker]="picker2" formControlName="dateTo">
      <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
      <mat-datepicker #picker2></mat-datepicker>
      <mat-error *ngIf="tripForm.get('dateTo')?.hasError('required')">
        To Date is required
      </mat-error>
      <mat-error *ngIf="tripForm.get('dateTo')?.hasError('invalidDate')">
        Invalid date
      </mat-error>
      <mat-error *ngIf="tripForm.hasError('dateRange')">
        From Date should be earlier than To Date
      </mat-error>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Description</mat-label>
      <input matInput formControlName="description">
      <mat-error *ngIf="tripForm.get('description')?.hasError('required')">
        Description is required
      </mat-error>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Image URL</mat-label>
      <input matInput formControlName="imageUrl">
      <mat-error *ngIf="tripForm.get('imageUrl')?.hasError('required')">
        Image URL is required
      </mat-error>
    </mat-form-field>
    <mat-form-field>
      <mat-label>Rating</mat-label>
      <mat-select formControlName="rating">
        <mat-option *ngFor="let rating of [1, 2, 3, 4, 5]" [value]="rating">
          {{ rating }}
        </mat-option>
      </mat-select>
      <mat-error *ngIf="tripForm.get('rating')?.hasError('required')">
        Rating is required
      </mat-error>
      <mat-error *ngIf="tripForm.get('rating')?.hasError('1') || tripForm.get('rating')?.hasError('5')">
        Rating should be between 1 and 5
      </mat-error>
    </mat-form-field>
  </form>
</div>
<div mat-dialog-actions>
<button mat-fab id="add" type="button" (click)="onCancel()"><mat-icon>cancel</mat-icon></button>
<button mat-fab id="save"  type ="button" [disabled]="!tripForm.valid" (click)="onSave()"><mat-icon>add</mat-icon></button>
</div>
  `,
  styleUrl: './new-trip-dialog.component.scss'
})
export class NewTripDialogComponent {
  tripForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewTripDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TripNote) {
    this.tripForm = this.fb.group({
      place: [data.place,Validators.required],
      dateFrom: [data.dateFrom, [Validators.required,this.dateValidator]],
      dateTo: [data.dateTo, Validators.required],
      description: [data.description, Validators.required],
      imageUrl: [data.imageUrl, Validators.required],
      rating: [data.rating, [Validators.required, Validators.min(1), Validators.max(5)]]},{validators:this.rangeValidator}
    );
  }
  dateValidator(control: AbstractControl): { [key: string]: any } | null {
    const isValidDate = control.value && !isNaN(Date.parse(control.value));
    return isValidDate ? null : { 'invalidDate': { value: control.value } };
  }
  rangeValidator(group: FormGroup): { [key: string]: any } | null {
    const dateFrom = group.get('dateFrom')?.value;
    const dateTo = group.get('dateTo')?.value;
    return dateFrom && dateTo && new Date(dateFrom) <= new Date(dateTo) ? null : { 'dateRange': true };
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.tripForm.valid ) {
      this.dialogRef.close(this.tripForm.value);
    }
  }
}
