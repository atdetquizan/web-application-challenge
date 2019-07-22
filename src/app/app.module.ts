import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { ClientsFormComponent } from './clients/clients-form/clients-form.component';
import { ClientsService } from './services/clients.service';

@NgModule({
    declarations: [
        AppComponent,
        ClientsFormComponent
    ],
    imports: [
        BrowserModule,
        CoreModule
    ],
    providers: [ClientsService],
    bootstrap: [AppComponent],
    entryComponents: [ClientsFormComponent]
})
export class AppModule { }
