import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';

import { environment } from 'src/environments/environment';
import { SweetalertService } from 'src/app/services/sweetalert.service';

@Component({
    selector: 'app-clients-form',
    templateUrl: './clients-form.component.html',
    styles: []
})
export class ClientsFormComponent implements OnInit {
    form: FormGroup;
    constructor(
        public bsModalRef: BsModalRef,
        private fb: FormBuilder,
        private clientsService: ClientsService,
        private sweetalertService: SweetalertService
    ) {
        this.createform();
    }

    ngOnInit() {}

    onClickSave() {
        const values = this.form.value;
        values.birthdate = values.birthdate.toString();
        this.clientsService.create(values).then(() => {
            this.sweetalertService.show(
                environment.messages.title.success,
                environment.messages.text.success,
                environment.messages.type.success
            );
            this.form.reset();
        });
    }

    private createform() {
        this.form = this.fb.group({
            name: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            years: [null, [Validators.required]],
            birthdate: [null, [Validators.required]]
        });
    }
}
