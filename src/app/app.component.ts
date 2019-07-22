import { Component, OnInit, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';

import { ClientsFormComponent } from './clients/clients-form/clients-form.component';
import { ClientsService } from './services/clients.service';
import { Client } from './interfaces/client';

import PerfectScrollbar from 'perfect-scrollbar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent  {
    title = 'web-application-challenge';
}
