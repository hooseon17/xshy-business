// src/app/reservation/reservation.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent {
  memberId: string = '';
  date: string = '';
  selectedTime: string = '';
  selectedTrainer: number | undefined;
  timeOptions: string[] = [];
  trainers: { id: number; name: string }[] = [];
  errorMessage: string = '';
  showErrorMessage: boolean = false;


  constructor(private http: HttpClient) {
    // Generate time options from 9:00 AM to 4:00 PM
    for (let hour = 9; hour <= 16; hour++) {
      var hourString = "AM"
      if (hour >= 12)
        hourString = "PM"
      this.timeOptions.push(`${hour}:00 ${hourString}`);
    }
  }

  ngOnInit() {
    this.loadTrainers();
  }

  private loadTrainers() {
    const apiUrl = 'https://example.com/gettrainers'; // Replace with your actual API endpoint

    this.http.get<{ id: number; name: string }[]>(apiUrl).subscribe(
      (data) => {
        this.trainers = data;
      },
      (error) => {
        console.error('Error fetching trainers:', error);
        // If the request fails, provide mock data
        this.trainers = [
          { id: 1, name: 'John Smith' },
          { id: 2, name: 'Jane Doe' },
          // Add more trainers as needed
        ];
      }
    );
  }

  onSubmit() {
    // Your form submission logic here
    console.log('Date:', this.date);
    console.log('Selected Time:', this.selectedTime);
    console.log('Selected Trainer:', this.selectedTrainer);

    const reserveUrl = 'https://example.com/reserve'; // Replace with your actual API endpoint

    const reservationData = {
      memberId: this.memberId,
      date: this.date,
      time: this.selectedTime,
      trainerId: this.selectedTrainer,
    };

    this.http.post(reserveUrl, reservationData).subscribe(
      () => {
        // On success
        alert('Submitted successfully');
        this.clearFields();
      },
      (error) => {
        console.error('Error submitting reservation:', error);

        // On failure
        if (error.status === 400 && error.error?.message === 'TrainerNotAvailable') {
          // If the trainer is not available at the selected time
          this.showWarningMessage();
        } else {
          // For other errors
          //alert('Failed to submit reservation. Please try again.');
          this.showWarningMessage();
        }
      }
    );
    // Continue with your form submission logic
  }

  private showWarningMessage() {
    // Display warning message, update styles
    this.errorMessage = 'The trainer is not available at the time. Please select other time.';
    this.showErrorMessage = true;
  }

  private clearFields() {
    // Clear form fields and reset styles
    this.memberId = '';
    this.date = '';
    this.selectedTime = '';
    this.selectedTrainer = undefined;

    this.showErrorMessage = false;
  }
}
