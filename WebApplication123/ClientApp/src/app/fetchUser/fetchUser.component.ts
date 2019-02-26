import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../Services/UserService.service';
@Component({
  selector: 'fetchUser',
  templateUrl: './fetchUser.component.html'
})
export class FetchUserComponent {
  public userList!: UserData[];

  constructor(public http: Http, private _router: Router, private _userService: UserService) {
    this.getUsers();
  }
  getUsers() {
    this._userService.getUsers().subscribe(
      data => this.userList = data
    )
  }
  delete(id_korisnik) {
    var ans = confirm("Do you want to delete customer with Id: " + id_korisnik);
    if (ans) {
      this._userService.deleteUser(id_korisnik).subscribe((data) => {
        this.getUsers();
      }, error => console.error(error))
    }
  }
}
interface UserData {
  id_korisnik: number;
  ime: string;
  prezime: string;
  email: string;
  username: string;
  password: string;
  tip: string;
}
