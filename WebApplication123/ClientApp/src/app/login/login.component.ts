import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  authFailed: boolean = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authentication: UserAuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authentication.currentUserValue) {
            this.router.navigate(['/home']);
        }
    }

  ngOnInit() {
    this.createLoginForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid){
      return;
    }

    this.loading = true;
    this.authentication.login( this.f.username.value, this.f.password.value )
      .pipe(first())
      .subscribe(
        data => {
            if (data) {
                this.router.navigate(['/tables']);
            } else {
                this.authFailed = true;
            }
            console.log(data);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
