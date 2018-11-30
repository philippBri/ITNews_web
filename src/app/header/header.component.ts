import {Component, HostListener, OnInit} from '@angular/core';
import {TokenStorage} from '../auth/token.storage';
import {GlobalService} from '../shared/services/global.service';
import {RoutingService} from '../shared/services/routing.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    userIsLogined = true;

    constructor(private tokenStorage: TokenStorage,
                private globalService: GlobalService,
                private routingService: RoutingService,
                private translate: TranslateService) {
        translate.addLangs(['en', 'ru']);
        translate.setDefaultLang(this.globalService.getLang());
    }

    ngOnInit() {
        this.globalService.currLoginedUser.subscribe(value => {
            if (value == null) {
                this.userIsLogined = false;
            } else {
                console.log(value.role);
                this.userIsLogined = true;
            }
        });

    }

    onLogOut() {
        this.tokenStorage.logOut();
        this.globalService.setLoginedUser(null);
        this.routingService.loginPage();
    }

    refresh() {
        window.location.reload();
    }

    @HostListener('window:load', [])
    onReload() {
        this.globalService.setLoginedUser(null);
    }

    setLang(lang: string) {
        this.globalService.setLang(lang);
        this.translate.use(lang);
    }

    getLang() {
        return this.globalService.getLang();
    }


}
