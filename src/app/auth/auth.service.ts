import 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthService {

    private baseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {
    }

    attemptAuth(username: string, password: string): Observable<any> {
        const credentials = {username: username, password: password};
        console.log('attemptAuth ::');
        return this.http.post<any>(this.baseUrl + '/token/generate-token', credentials);
    }

    logOut() {
        return this.http.post<any>(this.baseUrl + '/logout', {});
    }

}
