import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  message!: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      displayName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      nickname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      website: new FormControl('', [Validators.required]),
      bio: new FormControl('', [Validators.required, Validators.minLength(20)]),
      jabber: new FormControl(''),
      aolIm: new FormControl(''),
      yahooIm: new FormControl(''),
    })
  }

  onSubmit() {
    const reqObj = this.registerForm.value;
    const { confirmPassword, ...formObj } = reqObj;

    this.authService.register(formObj).subscribe((res) => {
      console.log(res);
      if(res.message === "success") {
        this.router.navigate(['/login'], { queryParams: {message: 'success'} })
      } else {
        this.message = res.message;
      }
    },
    error => {
      this.message = error;
      if(error.status == 404) {
        this.openSnackBar("Username not found");
      } else if(error.status == 500) {
        this.openSnackBar("Causing Internal Server Error");
      } else if(error.status == 401) {
        this.openSnackBar("Username or Password incorrect");
      }
    })
  }

  openSnackBar(message: any): void {
    this._snackBar.open(message, '', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  validatePwd(event: any): void {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if(password !== confirmPassword) {
      this.registerForm.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      this.registerForm.get('confirmPassword')?.setErrors(null);
    }
  }
}
