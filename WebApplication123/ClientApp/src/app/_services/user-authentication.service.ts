import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UserAuthenticationService {
    constructor(private http: HttpClient) { }

    login(username, password) {
        // Poslati post request na odredjeni API
        return this.http.post<any>(`/User/Login/${username}/${password}`, { username: username, password: password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}

