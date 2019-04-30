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
    dynamicWidth = 400;

    dataSource = {
        // This is options part
        'chart': {
          'caption': 'Gross shift score divided by article categories',
          'subCaption' : 'Articles sold today',
          'showValues': '1',
          'showPercentInTooltip' : '0',
          'numberPrefix' : '€',
          'enableMultiSlicing': '1',
          'theme': 'fusion',
          'showPercentValues': true
        },
        // This is where data magic start
        'data': [{
          'label': 'Food',
          'value': '65'
        }, {
          'label': 'Drink',
          'value': '55'
        }, {
          'label': 'Dessert',
          'value': '30'
        }]
    };

    interval$;
    constructor(private auth: UserAuthenticationService) { }

    ngOnInit() {
        this.interval$ = interval(1000);
        // Calculate working time on component initialization
        const now1 = moment();
        this.calculateWorkingTime(now1, this.userLoginTime);

        this.interval$.subscribe(() => {
            const now = moment();
            this.calculateWorkingTime(now, this.userLoginTime);
            this.currentTime = moment().toDate();
        });

        this.dynamicWidth = window.innerWidth / 5;
    }

    ngOnDestroy() {
        // Unsubscribe from observable after closing component to avoid memory leaks
        clearInterval(this.interval$);
    }

    /**
     * @name calculateWorkingTime
     * @param date1 Date represent this moment in present
     * @param date2 Date represent moment in the past
     * @description It will calculate time that represent how long current user is working
     */
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

    /**
     * @name onResize
     * @param event Event that contain info about total window width
     * @description It will set the width of fusioncharts component
     * every time a user resize the window
     */
    onResize(event) {
        // console.log( 'Resize event', event.target.innerWidth);
        this.dynamicWidth =  event.target.innerWidth / 5;
      }

}
