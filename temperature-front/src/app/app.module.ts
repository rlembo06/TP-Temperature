import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Http, RequestOptions } from '@angular/http';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { ChartsModule } from 'ng2-charts';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

import {TemperatureService} from '../services/temperature.service';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        ChartsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    providers: [
        TemperatureService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
