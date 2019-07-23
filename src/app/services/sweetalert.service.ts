import { Injectable } from '@angular/core';

declare const swal: any;
@Injectable({
    providedIn: 'root'
})
export class SweetalertService {
    constructor() { }

    show(...arg: any) {
        return swal(...arg);
    }
}
