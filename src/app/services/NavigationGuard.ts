import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanNavigateService } from './CanNavigateService';

@Injectable()
export class NavigationGuard implements CanDeactivate<any> {

    constructor(private canNavigateService: CanNavigateService) { }

    canDeactivate(component: any) {

        if (this.canNavigateService.getBackClicked()) {
            this.canNavigateService.setBackClicked(false);
            history.pushState(null, null, location.href);
            return false;
          }
          return true;
    }

}
