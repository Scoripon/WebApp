import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../_helpers/custom-validators';
import { UserService } from '../../../_services/user.service';
import { User } from '../../../_models/user';

@Component({
  selector: 'edit-user',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.scss']
})
export class EditUserComponent implements OnInit {

    // Setup Form
    editForm: FormGroup;
    submitted = false;

    @Input() userToEdit: any;
    @Output() userEdited = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.createEditForm();
    }

    /**
     * @name createEditForm
     * @description It will create register form and setup basic validation
     */
    createEditForm() {
        this.editForm = this.formBuilder.group({
            firstName: [this.userToEdit.firstname, Validators.required],
            lastName: [this.userToEdit.lastname, Validators.required],
            username: [this.userToEdit.username, Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            confirmPassword: ['', Validators.required],
            type: [this.userToEdit.type, Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.editForm.controls; }

    /**
     * @name submit
     * @description If
     */
    submit() {
        this.submitted = true;
        const arePasswordsEqual: boolean = (this.f.confirmPassword.value === this.f.password.value);

        if (this.editForm.invalid || !arePasswordsEqual) {
            return;
        }

        // Create User object
        const user: User = {
            id_user: this.userToEdit.id_user,
            firstName: this.f.firstName.value,
            lastName: this.f.lastName.value,
            username: this.f.username.value,
            password: this.f.password.value,
            type: this.f.type.value
        };

        this.userService.editUser(user).subscribe(
            data => {
                console.log('USER EDITED', data);
                this.userEdited.emit(true);
                // this.alertService.success('Registration successful', true);
                // this.router.navigate(['/login']);
            },
            error => {
                console.log(error);
                // this.alertService.error(error);
            }
        );
    }

    cancel() {
        this.userEdited.emit(false);
    }

}
