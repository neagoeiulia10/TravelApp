import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { NewTripDialogComponent } from '../new-trip-dialog/new-trip-dialog.component';
import { TripNote } from '../trip-note.model';
import { TripNoteService } from '../trip-note.service';
import { TripNoteComponent } from '../trip-note/trip-note.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastService } from '../toast.service';
import { ToastComponent } from '../toast/toast.component';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TripNoteComponent,
    MatToolbarModule,
    ToastComponent
  ],
  template: `
    <div class="home-container">
      <mat-toolbar>
        <span>My Travel Journal</span>
        <span class="spacer"></span>
        <button mat-fab color="primary" (click)="openNewTripDialog()">
          <mat-icon>add</mat-icon>
        </button>
      </mat-toolbar>

      <div class="content">
        <app-trip-note
          [tripNotes]="tripNotes"
          (editedNote)="onEditTrip($event)"
          (deletedNote)="onDeleteTrip($event)"
        ></app-trip-note>
      </div>

      <app-toast></app-toast>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .content {
      flex: 1;
      padding: 20px;
    }

    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class HomeComponent implements OnInit {
  tripNotes: TripNote[] = [];

  constructor(
    private dialog: MatDialog,
    private tripNoteService: TripNoteService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loadTripNotes();
  }

  private loadTripNotes(): void {
    this.tripNotes = this.tripNoteService.getTripNotes();
  }

  openNewTripDialog(): void {
    const dialogRef = this.dialog.open(NewTripDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tripNoteService.addNote(result);
        this.loadTripNotes();
        this.toastService.showToast('Trip added successfully!', 'add');
      }
    });
  }

  onEditTrip(updatedTrip: TripNote): void {
    this.tripNoteService.updateNote(updatedTrip);
    this.loadTripNotes();
    this.toastService.showToast('Trip updated successfully!', 'edit');
  }

  onDeleteTrip(tripId: number): void {
    this.tripNoteService.deleteNote(tripId);
    this.loadTripNotes();
    this.toastService.showToast('Trip deleted successfully!', 'delete');
  }
}