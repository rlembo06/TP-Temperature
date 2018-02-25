/**
 * Explication Guard & Route :
 * https://medium.com/@simonb90/activer-d%C3%A9sactiver-des-routes-dynamiquement-avec-angular-5817c4276322
 * https://angular-2-training-book.rangle.io/handout/routing/route_guards.html
 */

import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

@Injectable()
export class GuardService implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/']);
        return false;
    }
}
