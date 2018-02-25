import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Http, RequestOptions } from '@angular/http';

import { AppRoutingModule } from './app-routing/app-routing.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

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
        JsonpModule
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    providers: [
        AuthentificationService,
        GuardService,
        GuardAdminService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
