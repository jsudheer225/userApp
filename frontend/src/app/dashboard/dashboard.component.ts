import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  userDetails!: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userData') || '{}');
  }

  logout() {
    this.authService.logout();
  }
}
