import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchUserComponent } from '../fetchUser/fetchUser.component';
import { UserService } from '../Services/UserService.service';

@Component({
  selector: 'createUser',
  templateUrl: './AddUser.component.html'
})
export class createUser implements OnInit {
  userForm: FormGroup;
  title: string = "Create";
  id_korisnik!: number;
  errorMessage: any;
  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _userService: UserService, private _router: Router) {
    if (this._avRoute.snapshot.params["id_korisnik"]) {
      this.id_korisnik = this._avRoute.snapshot.params["id_korisnik"];
    }
    this.userForm = this._fb.group({
      id_korisnik: 0,
      ime: ['', [Validators.required]],
      prezime: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username : ['', [Validators.required]],
      password: ['', [Validators.required]],
      tip: ['', [Validators.required]]
    })
  }
  ngOnInit() {
    if (this.id_korisnik > 0) {
      this.title = "Edit";
      this._userService.getUserById(this.id_korisnik)
        .subscribe(resp => this.userForm.setValue(resp)
          , error => this.errorMessage = error);
    }
  }
  save() {
    if (!this.userForm.valid) {
      return;
    }
    if (this.title == "Create") {
      this._userService.saveUser(this.userForm.value)
        .subscribe((data) => {
          this._router.navigate(['/fetch-user']);
        }, error => this.errorMessage = error)
    }
    else if (this.title == "Edit") {
      this._userService.updateUser(this.userForm.value)
        .subscribe((data) => {
          this._router.navigate(['/fetch-user']);
        }, error => this.errorMessage = error)
    }
  }
  cancel() {
    this._router.navigate(['/fetch-user']);
  }
  get ime() { return this.userForm.get('ime'); }
  get prezime() { return this.userForm.get('prezime'); }
  get email() { return this.userForm.get('email'); }
  get username() { return this.userForm.get('username'); }
  get password() { return this.userForm.get('password'); }
  get tip() { return this.userForm.get('tip'); }

}
