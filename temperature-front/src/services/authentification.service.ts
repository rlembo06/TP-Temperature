import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../class/user';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import * as jwt from 'angular2-jwt-simple';

@Injectable()
export class AuthentificationService {

	public token: string;
    public results = [];
    public authentified = false;
    private uri: string;

	constructor(
        private http: Http,
        private router: Router,
    )
    {
		this.uri = "http://localhost:3000/";
	}

	getUsers() {
		return this.http.get(this.uri + "user/all");
    }


    login(username: string, password: string): Observable<boolean> {

        let user = {
			username: username,
			password: password
        };

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.uri + "user/login", JSON.stringify(user), options)
            .map((response: Response) => {

                if (response.status === 200) {
                    this.token = jwt.decode(response.text(), 'secret');

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(this.token));
                    let tokenUser = localStorage.getItem('currentUser');

                    return true;
                } else {
                    return false;
                }
            });
    }

    loginAdmin(user: User): Observable<boolean> {

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.uri + "admin/login", JSON.stringify(user), options)
            .map((response: Response) => {

                if (response.status === 200) {
                    this.token = jwt.decode(response.text(), 'secret');

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentAdmin', JSON.stringify(this.token));
                    let tokenUser = localStorage.getItem('currentAdmin');
                    console.log(tokenUser);

                    return true;
                } else {
                    return false;
                }
            });
    }


    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    logoutAdmin(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentAdmin');
        this.router.navigate(['/']);
    }

}
