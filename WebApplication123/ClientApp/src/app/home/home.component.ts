import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../_services/user-authentication.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { Subscription } from 'rxjs';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    currentUser: User;
    currentUserSubscription: Subscription;

    constructor(
        private authentication: UserAuthenticationService,
        private router: Router
    ) {
        this.currentUserSubscription = this.authentication.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
    }

    logout() {
        this.authentication.logout();
        this.router.navigate(['/login']);
    }
}
