import { Injectable } from '@angular/core';

@Injectable()
export class CanNavigateService {

    public isRoutingBack = false;

    getBackClicked() {
        return this.isRoutingBack;
    }
    setBackClicked(value: boolean) {
        this.isRoutingBack = value;
    }

}
