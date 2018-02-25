import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Temperature} from '../class/temperature';

@Injectable()
export class TemperatureService {

    private uri: string;

    constructor(
        private http: Http,
    )
    {
        this.uri = "http://localhost:3000/data";
    }

    /**
     * Method for getting user data.
     * @returns {Observable<String>}
     */
    //get(): Observable<Temperature> {
    get(): Observable<any> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.uri + "/all", options)
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }

}
