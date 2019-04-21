import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class UserSettingsComponent implements OnInit, OnDestroy {

    allUsers: any;
    userForEdit: any;
    isAdmin: boolean = false;

    // All products from the database and a product we want to edit
    allProducts: any;
    productForEdit = null;

    currentUser: User;
    currentUserSubscription: Subscription;

    // Set view-contorl variables
    openEdit: boolean = false;
    showAdminSettings: boolean = false;
    showArticlesManagement: boolean = false;
    showUserInfo: boolean = true;

    constructor(
        private userService: UserService,
        private productService: ProductService,
        private authentication: UserAuthenticationService,
    ) {}

    ngOnInit() {
        this.currentUserSubscription = this.authentication.currentUser.subscribe(user => {
            this.currentUser = user;
            if (this.currentUser.type.toLowerCase() === 'a') {
                this.isAdmin = true;
            } else {
                this.isAdmin = false;
            }
        });

        this.fetchUsers();
        this.fetchProducts();
    }

    ngOnDestroy() {
        // Unsubscribe from observable after closing component to avoid memory leaks
        this.currentUserSubscription.unsubscribe();
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
     * @name fetchProducts
     * @description It will fetch all added products, which will be displayed in products table
     */
    fetchProducts() {
        this.productService.getAllProducts().subscribe(
            data => {
                this.allProducts = data;

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
        this.setControlViewVariables();
        this.openEdit = true;
        this.userForEdit = user;
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
            this.authentication.setSessionStorage(user);
        }
        this.openEdit = false;
    }

    /**
     * @name onAdminSettingsClicked
     * @description It will show users table and hide edit form
     */
    onAdminSettingsClicked() {
        this.setControlViewVariables();
        this.showAdminSettings = true;
    }

    /**
     * @name onArticlesManagementClicked
     * @description It will show articles management section and hide edit form and admin table
     */
    onArticlesManagementClicked() {
        this.setControlViewVariables();
        this.showArticlesManagement = true;
    }

    /**
     * @name onProductChanged
     * @description It will update product list in the table
     */
    onProductChanged() {
        this.fetchProducts();
    }

    /**
     * @name setControlViewVariables
     * @description It will set all varibles that controls what components are
     * visible on the page to false
     */
    setControlViewVariables() {
        this.showAdminSettings = false;
        this.openEdit = false;
        this.showUserInfo = false;
        this.showArticlesManagement = false;
        this.productForEdit = null;
    }

    /**
     * @name onUserInfoClicked
     * @description It will show user info section
     */
    onUserInfoClicked() {
        this.setControlViewVariables();
        this.showUserInfo = true;
    }

    /**
     * @name onProductAction
     * @param event If it is edit action then it's product that we want to edit
     * and if it is delete action it's false
     * @description It will be trigered every time user click delete or edit button
     * in the product table component
     */
    onProductAction(event) {
        // If it is edit action then fill the product form
        if (event) {
            this.productForEdit = event;
        } else {
            // If it's Delete action update list of products in the table
            this.fetchProducts();
        }

    }
}
