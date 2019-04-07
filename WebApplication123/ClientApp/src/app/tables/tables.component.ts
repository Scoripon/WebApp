import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

    tables = [1, 2, 3, 4, 5, 6];

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
    }

    chooseTable(table) {
        /*
            ==============================================================================
                When user select table, navigate to home component and send table data
            ==============================================================================
        */
        this.router.navigate(['/home'], {
            queryParams: {
                'tableId': table
            }
        });
    }
}
