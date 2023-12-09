import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Add authentication logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // Implement authentication and navigation logic as needed
    this.router.navigate(['/reservation']);
  }
}
