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
    registerUser(user) {
        return this.http.post('/User/Create', user);
    }

    /**
     * @name editUser
     * @param user User object with edited data
     * @description It will send edited User object to the backend API, and update the user
     */
    editUser(user: User) {
        return this.http.put('/User/Edit', user);
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
        return this.http.get('/User/Index');
    }

    /**
     * @name deleteUser
     * @param id User ID
     * @description It will delete user with the specified id from the database
     */
    deleteUser(id) {
        return this.http.delete('/User/Delete/' + id);
    }


    /**
     * @name Login
     * @param username User username
     * @param password User password
     * @description It will send username and password to the backend API
     */
    login(username, password) {
        return this.http.post('/User/Login/' + username, password);
    }

}
