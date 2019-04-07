import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../_services/user-authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
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

    private tableSubscription: Subscription;
    selectedTables = [];

    constructor(
        private authentication: UserAuthenticationService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.currentUserSubscription = this.authentication.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        /*
            =========================================================
                Subscribe on data that is sent from Tables component
            =========================================================
        */
        this.tableSubscription = this.activatedRoute.queryParams.subscribe(table => {
            this.selectedTables.push(table);
            console.log('Table number is ', table);
        });
    }

    logout() {
        this.authentication.logout();
        this.router.navigate(['/login']);
    }
}
