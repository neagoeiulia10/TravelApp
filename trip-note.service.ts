import { Injectable, signal, WritableSignal } from '@angular/core';
import { TripNote } from './trip-note.model';
@Injectable({
  providedIn: 'root',
})
export class TripNoteService {
  filteredTrip: TripNote[] = [];
  // isEditing: any;

  public tripNotes: WritableSignal<TripNote[]> = signal([

    {
      id: 1,
      place: "Paris, France",
      dateFrom: new Date('2024-05-01'),
      dateTo: new Date('2024-05-10'),
      description: "Vacation in Paris",
      imageUrl: "./assets/paris.jpg",
      rating: 5
    },
    {
      id: 2,
      place: "new York, USA",
      dateFrom: new Date('2024-06-15'),
      dateTo: new Date('2024-06-20'),
      description: "Business trip to New York",
      imageUrl: "assets/new.jpg",
      rating: 4
    },
    {
      id: 3,
      place: "tokyo, Japan",
      dateFrom: new Date('2024-07-05'),
      dateTo: new Date('2024-07-12'),
      description: "Exploring Tokyo's culture",
      imageUrl: "assets/tokyo.jpg",
      rating: 5
    },
    {
      id: 4,
      place: "rome, Italy",
      dateFrom: new Date('2024-08-01'),
      dateTo: new Date('2024-08-08'),
      description: "Historical tour in Rome",
      imageUrl: "assets/rome.jpg",
      rating: 5
    },
    {
      id: 5,
      place: "Sydney, Australia",
      dateFrom: new Date('2024-09-10'),
      dateTo: new Date('2024-09-18'),
      description: "Vacation and sightseeing in Sydney",
      imageUrl: "assets/sydney.jpg",
      rating: 4
    },
    {
      id: 6,
      place: "Cape Town, South Africa",
      dateFrom: new Date('2024-10-15'),
      dateTo: new Date('2024-10-22'),
      description: "Exploring Cape Town's natural beauty",
      imageUrl: "assets/cope.jpg",
      rating: 5
    }
  ]
  )
  constructor() { }
  deleteNote(id: number) {
    const updatedNotes = this.tripNotes().filter((tripNote: TripNote) => tripNote.id !== id);
    this.tripNotes.set([...updatedNotes]);
  }
  getTripNotes(descriptionFilter?: string, placeFilter?: string): TripNote[] {
    if (!!descriptionFilter) {
      return this.tripNotes().filter(tripNote => tripNote.description.toLowerCase().includes(descriptionFilter.toLowerCase()));
    }
    // if(!!placeFilter) {
    //   return this.tripNotes().filter(tripNote => tripNote.place.toLowerCase().includes(placeFilter.toLowerCase() ));

    // }
    return this.tripNotes();
  }

  updateNote(updatedNotes: Partial<TripNote>): void {
    const currentNotes = this.tripNotes();
    const noteIndex = currentNotes.findIndex((tripNote) => tripNote.id === updatedNotes.id);
    if (noteIndex !== -1) {
      currentNotes[noteIndex] = { ...currentNotes[noteIndex], ...updatedNotes };
      this.tripNotes.set([...currentNotes]);
    }
  }
  addNote(tripNote: TripNote): void {
    const id = this.tripNotes().length + 1;
    tripNote.id = id;
    this.tripNotes.set([...this.tripNotes(), tripNote])
  }
  applyFilters(ratings: number[], dateTo: Date | null, dateFrom: Date | null): TripNote[] {
    this.filteredTrip = this.tripNotes().filter(note => {
      const matchesRating = ratings.length === 0 || ratings.includes(note.rating);
      const matchesDateFrom = !dateFrom || new Date(note.dateFrom) >= new Date(dateFrom);
      const matchesDateTo = !dateTo || new Date(note.dateTo) <= new Date(dateTo);
      return matchesRating && matchesDateFrom && matchesDateTo;
    });
    if (this.filteredTrip.length === 0) {
      return []
    } else {
      return this.filteredTrip;
    }
  }

  clearAllFilters(): void {
    this.filteredTrip = this.tripNotes();
  }

}

//ngrX state management

