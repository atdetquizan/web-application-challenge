import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ClientsFormComponent } from './clients/clients-form/clients-form.component';
import { ClientsService } from './services/clients.service';
import { Client } from './interfaces/client';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent implements OnInit {
    title = 'web-application-challenge';
    clientsList: Client[] = [];
    constructor(
        private bsModalRef: BsModalService,
        private clientsService: ClientsService
    ) {}

    ngOnInit() {
        this.showClients();
    }

    onEventClick() {
        const initialState = {};
        this.bsModalRef.show(ClientsFormComponent, {
            class: 'modal-dialog-centered',
            initialState
        });
    }

    getAverage() {
        let sum = 0;
        for (const item of this.clientsList) {
            sum += item.years;
        }
        console.log(sum);
        // if (this.clientsList.length > 0) {
        //     const sumYears = this.clientsList
        //         .map((res: Client) => res.years)
        //         .reduce((sum: number, year: number) => {
        //             return sum + year;
        //         });
        //         console.log(sumYears);
        // }
        // return this.clientsList.length > 0
        //     ? this.clientsList
        //           .map((res: Client) => res.years)
        //           .reduce((sum, year) => {
        //               return sum + year;
        //           }) / this.clientsList.length
        //     : 0;
        //     for (const item of this.clientsList) {

        //     }
        return sum;
    }

    private showClients() {
        this.clientsService.all().subscribe((res: Client[]) => {
            console.log(res);
            this.clientsList = res;
        });
    }
}
