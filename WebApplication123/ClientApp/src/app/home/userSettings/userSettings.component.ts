import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'user-settings',
  templateUrl: './userSettings.component.html',
  styleUrls: ['./userSettings.component.scss']
})
export class UserSettingsComponent implements OnInit {

    allUsers: any;
    selectedUser: any;
    openEdit: boolean = false;

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

    deleteUser(userID: number): void {
        this.userService.deleteUser(userID).subscribe(
            data => {
                console.log('User deleted!', data);
                this.fetchUsers();
            },
            error => {}
        );
    }

    openEditForm(user): void {
        this.openEdit = true;
        this.selectedUser = user;
    }

    onUserEdited(event: boolean) {

        if (event) {
            this.fetchUsers();
        }
        this.openEdit = false;
    }
}
