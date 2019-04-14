import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { Subscription } from 'rxjs';
import { UserAuthenticationService } from 'src/app/_services/user-authentication.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'user-settings',
  templateUrl: './userSettings.component.html',
  styleUrls: ['./userSettings.component.scss']
})
export class UserSettingsComponent implements OnInit {

    allUsers: any;
    allProducts: any;
    selectedUser: any;
    openEdit: boolean = false;
    showAdminSettings: boolean = false;
    currentUser: User;
    currentUserSubscription: Subscription;

    constructor(
        private userService: UserService,
        private productService: ProductService,
        private authentication: UserAuthenticationService,
    ) {
        this.currentUserSubscription = this.authentication.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.fetchUsers();
    }


    /**
     * @name fetchUsers
     * @description It will fetch all registered users, which will be displayed in users table
     */
    fetchUsers() {
        this.userService.getAllUsers().subscribe(
            data => {
                this.allUsers = data;

                console.log(data);
            },
            error => {}
        );
    }

    /**
     * @name fetchUsers
     * @description It will fetch all registered users, which will be displayed in users table
     */
    fetchProducts() {
        this.productService.getAllProducts().subscribe(
            data => {
                // this.allUsers = data;

                console.log('All products ', data);
            },
            error => {}
        );
    }

    /**
     * @name deleteUser
     * @param userID Id of user we want to delete
     * @description It will delete user with the current ID
     */
    deleteUser(userID: number): void {
        // First check if user trying to delete yourself
        if (this.currentUser.id_user === userID) {
            // TO DO: Use notification service instead of alert
            return alert('You cannot delete yourself!');
        }

        this.userService.deleteUser(userID).subscribe(
            data => {
                console.log('User deleted!', data);
                this.fetchUsers();
            },
            error => {}
        );
    }

    /**
     * @name openEditForm
     * @param user User data to edit
     * @description It will show edit form, hide users table and send user data to the edit form
     */
    openEditForm(user): void {
        this.openEdit = true;
        this.showAdminSettings = false;
        this.selectedUser = user;
    }


    /**
     * @name onUserEdited
     * @param user If user update successfully then it's type of User (_models/user.ts) otherwise false
     * @description Method that will be invoked every time when a user successfully update
     * or cancel edit form. It will refresh the table data and update the current user
     */
    onUserEdited(user) {
        if (user) {
            this.fetchUsers();
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            this.authentication.currentUserSubject.next(user);
        }
        this.openEdit = false;
    }

    /**
     * @name onAdminSettingsClicked
     * @description It will show users table and hide edit form
     */
    onAdminSettingsClicked() {
        this.showAdminSettings = true;
        this.openEdit = false;
    }
}
