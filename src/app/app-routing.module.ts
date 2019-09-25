import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsIndexComponent } from './clients/clients-index/clients-index.component';
import { ClientsProjectionComponent } from './clients/clients-projection/clients-projection.component';
import { NavigationGuard } from './services/NavigationGuard';

const routes: Routes = [
    {
        path: '',
        component: ClientsIndexComponent,
        canDeactivate: [NavigationGuard]
    },
    {
        path: 'projection',
        component: ClientsProjectionComponent,
        canDeactivate: [NavigationGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            useHash: true
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
