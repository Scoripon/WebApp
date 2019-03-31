import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from '../_helpers/custom-validators';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


import { UserAuthenticationService } from '../_services/user-authentication.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Setup Form
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authentication: UserAuthenticationService,
    private router: Router,
    private alertService: AlertService
    ) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. Has a minimum length of 8 characters
        Validators.minLength(8)])
      ],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(){
    this.submitted = true;

    if(this.loginForm.invalid){
      return;
    }

    this.loading = true;
    this.authentication.login( this.f.username.value, this.f.password.value )
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
        //   this.router.navigate(['/login']); --> Ovo je visak
          this.router.navigate(['/home']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }
}



