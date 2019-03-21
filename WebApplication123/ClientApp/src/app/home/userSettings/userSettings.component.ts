import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'user-settings',
  templateUrl: './userSettings.component.html',
  styleUrls: ['./userSettings.component.scss']
})
export class UserSettingsComponent implements OnInit {

    allUsers: any;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit() {
        this.fetchUsers();
    }

    fetchUsers() {
        this.userService.getAllUsers().subscribe(
            data => {
                this.allUsers = data;
                console.log(data);
            },
            error => {}
        );
    }

    deleteUser(id) {
        this.userService.deleteUser(id).subscribe(
            data => {
                console.log('User deleted!', data);
                this.fetchUsers();
            },
            error => {}
        );
    }

}
