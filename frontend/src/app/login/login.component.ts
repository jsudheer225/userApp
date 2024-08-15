import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      const msg = params['message'];
      if(msg === "success") {
        this.openSnackBar("Registration Success. Please login here to access to application", 10);
      }
    });
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    this.authService.login(this.loginForm.controls['userName'].value, this.loginForm.controls['password'].value).subscribe((res) => {
      if(res.accessToken !== "") {
        this.router.navigate(['/dashboard']);
      }
    }, error => {
      console.log(error.status);
      if(error.status == 404) {
        this.openSnackBar("Username not found", 5);
      } else if(error.status == 500) {
        this.openSnackBar("Causing Internal Server Error", 5);
      } else if(error.status == 401) {
        this.openSnackBar("Username or Password incorrect", 5);
      }
    })
  }

  openSnackBar(message: string, timeDuration: number): void {
    this._snackBar.open(message, '', {
      duration: timeDuration * 1000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }


}
