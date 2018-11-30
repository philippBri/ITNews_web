import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../models/user.model';
import {UserService} from './user.service';
import {TokenStorage} from '../../auth/token.storage';

@Injectable()
export class GlobalService {

    private loginedUserSubject = new BehaviorSubject(null);
    currLoginedUser = this.loginedUserSubject.asObservable();
    private currentUser: User;

    constructor(private userService: UserService,
                private tokenStorage: TokenStorage) {
    }


    setLoginedUser(user) {
        const token = this.tokenStorage.getToken();
        if (user == null && token) {
            this.userService.getUserInfo(token).subscribe(
                user => {
                    if (user) {
                        this.currentUser = user;
                        this.loginedUserSubject.next(this.currentUser);
                    } else {
                        Observable.empty();
                    }
                }
            );
        } else {
            this.loginedUserSubject.next(user);
        }
    }

    setLang(lang: string) {
        localStorage.setItem('lang', lang);
    }

    getLang() {
        const lang = localStorage.getItem('lang');
        if (!lang) {
            return 'en';
        }
        return lang;
    }
}