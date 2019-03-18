import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { post } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient
    ) { }

    /**
     * @name registerUser
     * @param user User object type of '_models/user' with all data needed for registration
     * @description It will send User object to the backend API
     */
    registerUser(user: User) {
        return this.http.post('/User/Create', user);
    }

    /**
     * @name editUser
     * @param user User object type of '_models/user' with edited data
     * @description It will send edited User object to the backend API, and update the user
     */
    editUser(user: User) {
        return this.http.put('api/User/Edit', user);
    }

    /**
     * @name getUserById
     * @param id User ID
     * @description It will get User with specified id from the database, if he exists
     */
    getUserById(id) {
        return this.http.get('/User/Details/' + id);
    }

    /**
     * @name getAllUsers
     * @description It will get all registered users from the database
     */
    getAllUsers() {
        return this.http.get('api/User/Index');
    }

    /**
     * @name deleteUser
     * @param id User ID
     * @description It will delete user with the specified id from the database
     */
    deleteUser(id) {
        return this.http.delete('api/User/Delete/' + id);
    }
}
