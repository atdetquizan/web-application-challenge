import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { Client } from '../../interfaces/client';
import * as moment from 'moment';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-clients-list',
    templateUrl: './clients-list.component.html',
    styles: []
})
export class ClientsListComponent implements OnInit {
    clientsList: Client[] = [];
    @Input() hasProjection = false;
    @Output() data: EventEmitter<any> = new EventEmitter();
    @Output() eventEdit: EventEmitter<any> = new EventEmitter();
    constructor(
        private clientsService: ClientsService,
        private sweetalertService: SweetalertService
    ) {}

    ngOnInit() {
        this.showClients();
        const container: HTMLElement = document.querySelector(
            '.container-table'
        );
        const ps = new PerfectScrollbar(container);
    }

    onClickDelete(item: any) {
        this.sweetalertService
            .show({
                title: environment.messages.title.warningDelete,
                text: environment.messages.text.warningDelete,
                icon: environment.messages.type.warning,
                buttons: true,
                dangerMode: true
            })
            .then(willDelete => {
                if (willDelete) {
                    this.clientsService.delete(item.id).then(() => {
                        this.sweetalertService.show(
                            environment.messages.text.successDelete,
                            {
                                icon: environment.messages.type.success
                            }
                        );
                    });
                }
            });
    }

    onClickEdit(client: any) {
        this.eventEdit.emit(client);
    }

    getRenderDate(date: any) {
        return moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY');
    }

    getDeathDate(date: any) {
        // Los años de mortalidad para una persona en el peru es de 73 años actualmente
        const yaerBirthdate = moment(date, 'DD/MM/YYYY').year();
        const yearCurrent = moment().year();
        const diffYears = 73 - (yaerBirthdate - yearCurrent);
        return moment(date, 'DD/MM/YYYY')
            .add(diffYears, 'years')
            .format('DD/MM/YYYY');
    }

    private showClients() {
        this.clientsService.all().subscribe((res: Client[]) => {
            this.clientsList = res;
            this.data.emit(res);
        });
    }
}
