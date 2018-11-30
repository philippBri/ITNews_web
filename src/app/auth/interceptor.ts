import {
    HttpErrorResponse,
    HttpHandler,
    HttpHeaderResponse,
    HttpInterceptor,
    HttpProgressEvent,
    HttpRequest,
    HttpResponse,
    HttpSentEvent,
    HttpUserEvent
} from '@angular/common/http';
import 'rxjs/add/operator/do';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TokenStorage} from './token.storage';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {RoutingService} from '../shared/services/routing.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private token: TokenStorage, private routingService: RoutingService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        let authReq = req;
        if (this.token.getToken() != null) {
            authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())});
            console.log('Is authRequest: ' + authReq);
        }
        return next.handle(authReq).pipe(catchError(
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    console.log('req url :: ' + req.url);
                    if (err.status === 401) {
                        this.routingService.newsPage('all');
                    }
                    if (err.status === 400) {
                        // auto logout if 401 response returned from api
                        this.token.logOut();
                        return throwError('Username or password is invalid!');
                    }
                    if (err.status === 403) {
                        this.token.logOut();
                        return throwError('Current user is blocked. Please, contact administrator.');
                    }
                    err = err.error || err.statusText; //probably
                    return throwError(err);
                }
            }
        )as any);
    }

}
