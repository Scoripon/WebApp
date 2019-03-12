import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../_helpers/custom-validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    // Setup Form
    registerForm: FormGroup;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit() {
        this.createSignupForm();
    }

    /**
     * @name createSignupForm
     * @description It will create register form and setup basic validation
     */
    createSignupForm() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['',  Validators.compose([
                // 1. Password Field is Required
                Validators.required,
                // 2. check whether the entered password has a number
                CustomValidators.patternValidator(/\d/, { hasNumber: true }),
                // 3. check whether the entered password has upper case letter
                CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                // 4. Has a minimum length of 8 characters
                Validators.minLength(8)])
            ],
            confirmPassword: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    /**
     * @name submit
     * @description If validation pass, it will send user details to the backend API
     * and redirect to login page
     */
    submit() {
        this.submitted = true;
        const arePasswordsEqual: boolean = (this.f.confirmPassword.value === this.f.password.value);

        if (this.registerForm.invalid || !arePasswordsEqual) {
            return;
        }

        // Create User object
        const user = {
            name: this.f.firstName.value,
            lastName: this.f.lastName.value,
            username: this.f.username.value,
            password: this.f.password.value

        };
        // this.router.navigate(['login']);
    }
}
