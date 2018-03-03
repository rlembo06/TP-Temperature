import { Component, OnInit } from '@angular/core';
import { TemperatureService } from '../../services/temperature.service';
import {Temperature} from '../../class/temperature';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    public isDataAvailable: boolean = false;
    public lineChartData: Array<any> = [];

    public lineChartLabels: Array<any> = [];

    public lineChartOptions:any = { responsive: true };
    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend:boolean = false;
    public lineChartType:string = 'line';

    constructor(
        private temperatureService: TemperatureService
    ) {}

    ngOnInit() {
        this.lineChartData = [
            {data: [], label: 'Température'},
            {data: [], label: 'Volt'},
        ];

        this.getData();
    }

    getData() {
        this.temperatureService.get()
            .subscribe(result => {
                let degres = { data: [], label: 'Température' };
                let voltage = { data: [], label: 'Volt' };

                result.map( (temperature) => {
                    degres.data.push(temperature.value);
                    voltage.data.push(temperature.voltage);

                    console.log('Time :', new Date(temperature.date).getHours());
                    this.lineChartLabels.push(
                        new Date(temperature.date).getHours() +' : '+
                        new Date(temperature.date).getMinutes() +' : '+
                        new Date(temperature.date).getSeconds() +' : '+
                        new Date(temperature.date).getMilliseconds()
                    );

                });

                this.lineChartData.push(degres);
                this.lineChartData.push(voltage);
                this.isDataAvailable = true;
            });
    }

}
