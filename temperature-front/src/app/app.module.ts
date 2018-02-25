import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Http, RequestOptions } from '@angular/http';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SelectModule } from 'ng-select';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';

import {AuthentificationService} from '../services/authentification.service';
import {GuardService} from '../services/guard.service';
import {GuardAdminService} from '../services/guard-admin.service';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        SelectModule,
        ConfirmationPopoverModule.forRoot({
            focusButton: 'confirm'
        })
    ],
    declarations: [
        AppComponent,
        DashboardComponent
    ],
    providers: [
        AuthentificationService,
        GuardService,
        GuardAdminService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
