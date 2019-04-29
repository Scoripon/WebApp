import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { UserAuthenticationService } from 'src/app/_services/user-authentication.service';
import { Observable, Subject, interval } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit, OnDestroy {

    userLoginTime = moment(JSON.parse(sessionStorage.getItem('loginTime')));
    userWorkingTime: any;
    currentTime = moment().toDate();
    totalOrders = 5;
    grossShiftScore = 150;

    interval$;
    constructor(private auth: UserAuthenticationService) { }

    ngOnInit() {
        this.interval$ = interval(1000);
        const now1 = moment();
        this.calculateWorkingTime(now1, this.userLoginTime);

        this.interval$.subscribe(() => {
            const now = moment();
            this.calculateWorkingTime(now, this.userLoginTime);
            this.currentTime = moment().toDate();
        });
    }

    ngOnDestroy() {
        // Unsubscribe from observable after closing component to avoid memory leaks
        clearInterval(this.interval$);
    }

    calculateWorkingTime(date1, date2) {

        const diffInMs = date1 - date2;

        const msInDay = 24 * 60 * 60 * 1000,
            msInHour = 60 * 60 * 1000,
            msInMin = 60 * 1000,
            msInSec = 1000;

        let days = Math.floor(diffInMs / msInDay),
            hours: any = Math.floor((diffInMs - days * msInDay) / msInHour),
            min: any = Math.floor((diffInMs - days * msInDay - hours * msInHour ) / msInMin),
            sec: any = Math.floor((diffInMs - days * msInDay - hours * msInHour - min * msInMin) / msInSec);

            hours > 9 ? hours = hours : hours = '0' + hours;
            min > 9 ? min = min : min = '0' + min;
            sec > 9 ? sec = sec : sec = '0' + sec;

        this.userWorkingTime =  hours + ':' + min + ':' + sec;
    }

}
