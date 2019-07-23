import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';

import { environment } from 'src/environments/environment';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { CustomValidators } from 'ngx-custom-validators';
import { ControlMessagesService } from 'src/app/services/control-messages.service';
import { Client } from 'src/app/interfaces/client';
import * as moment from 'moment';

@Component({
    selector: 'app-clients-form',
    templateUrl: './clients-form.component.html',
    styles: []
})
export class ClientsFormComponent implements OnInit {
    form: FormGroup;
    client: Client;
    maxDate: any;
    constructor(
        public bsModalRef: BsModalRef,
        private fb: FormBuilder,
        private clientsService: ClientsService,
        private sweetalertService: SweetalertService
    ) {
        this.createform();
        this.maxDate = new Date();
    }

    ngOnInit() {
        const values: any = this.client;
        values.birthdate = moment(this.client.birthdate).format('DD/MM/YYYY');
        this.form.patchValue({ ...values });
    }

    onClickSave() {
        ControlMessagesService.markFormGroupTouched(this.form);
        if (this.form.valid) {
            const values = this.form.value;
            values.birthdate = moment(values.birthdate).format('DD/MM/YYYY');
            console.log(values);
            if (!this.client) {
                this.clientsService.create(values).then(() => {
                    this.sweetalertService.show(
                        environment.messages.title.success,
                        environment.messages.text.success,
                        environment.messages.type.success
                    );
                    this.form.reset();
                });
            } else {
                this.clientsService
                    .update(this.client.id, values)
                    .then(() => {
                        this.sweetalertService.show(
                            environment.messages.title.success,
                            environment.messages.text.success,
                            environment.messages.type.success
                        );
                        this.bsModalRef.hide();
                        this.form.reset();
                    });
            }
        }
    }

    private createform() {
        this.form = this.fb.group({
            id: [null, null],
            name: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            years: [
                null,
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(122),
                    CustomValidators.digits
                ]
            ],
            birthdate: [new Date(), [Validators.required, CustomValidators.date]]
        });
    }
}
