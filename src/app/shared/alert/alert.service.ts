import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Injectable()
export class AlertService {
    subject = new Subject();
    pageIsChanged = false;

    constructor(private router: Router) {
        router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(
            (event: NavigationStart) => {
                if (this.pageIsChanged) {
                    // only keep for a single location change
                    this.pageIsChanged = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            });
    }

    error(message: string, pageIsChanged = false) {
        this.pageIsChanged = pageIsChanged;
        this.subject.next({type: 'error', text: message});
    }

    success(message: string, pageIsChanged = false) {
        this.pageIsChanged = pageIsChanged;
        this.subject.next({type: 'success', text: message});
    }

    getMessage() {
        return this.subject.asObservable();
    }
}