import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

const PATH = {
    home: 'home',
    login: 'login',
    profile: 'home/profile',
    news: 'news',
    editNews: 'home/editNews/',
    newsList: 'home/newsList',
    publicInfo: 'publicUserInfo/',
    logout: '/logout'

};

@Injectable()
export class RoutingService {

    constructor(private router: Router) {
    }

    goHome() {
        this.router.navigate([PATH.home]);
    }

    profilePage() {
        this.router.navigate([PATH.profile]);
    }

    loginPage() {
        this.router.navigate([PATH.login]);
    }

    newsPage(param) {
        this.router.navigate([PATH.news, param]);
    }

    editNews(param) {
        this.router.navigate([PATH.editNews, param]);
    }

    newsList() {
        this.router.navigate([PATH.newsList]);
    }

    publicUserInfo(param) {
        this.router.navigate([PATH.publicInfo, param]);
    }

    logOut() {
        this.router.navigate([PATH.logout]);
    }
}