import { Component, OnInit } from '@angular/core';
import { Client } from '../../interfaces/client';
import { BsModalService } from 'ngx-bootstrap';
import { ClientsFormComponent } from '../clients-form/clients-form.component';

@Component({
    selector: 'app-clients-index',
    templateUrl: './clients-index.component.html',
    styles: []
})
export class ClientsIndexComponent implements OnInit {
    clientsList: Client[] = [];
    constructor(private bsModalRef: BsModalService) {}

    ngOnInit() {
        //
    }

    onEventClick() {
        const initialState = {};
        this.bsModalRef.show(ClientsFormComponent, {
            class: 'modal-dialog-centered',
            initialState
        });
    }

    getAverage() {
        if (this.clientsList.length) {
            const total = this.getTotal();
            return total / this.clientsList.length;
        }
        return 0;
    }

    getStandardDeviation() {
        if (this.clientsList.length > 0) {
            const total = this.getTotal();
            const media = total / this.clientsList.length;
            let sum = 0;
            for (const item of this.clientsList) {
                sum +=
                    (Number(item.years) - media) * (Number(item.years) - media);
            }
            const vari = sum / this.clientsList.length;
            return Math.sqrt(vari);
        }
        return 0;
    }

    private getTotal() {
        let sum = 0;
        for (const item of this.clientsList) {
            sum += Number(item.years);
        }
        return sum;
    }
}
