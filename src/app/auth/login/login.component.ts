import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {AuthService} from '../auth.service';
import {TokenStorage} from '../token.storage';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../../shared/services/global.service';
import {RoutingService} from '../../shared/services/routing.service';
import {AlertService} from '../../shared/alert/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: User = new User();
    loginForm: FormGroup;

    constructor(private authService: AuthService,
                private tokenStorage: TokenStorage,
                private routingService: RoutingService,
                private alertService: AlertService) {
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            'username': new FormControl(null, Validators.required),
            'password': new FormControl(null, Validators.required)
        });
    }

    onLogin(): void {
        this.user.username = this.loginForm.get('username').value;
        this.user.password = this.loginForm.get('password').value;
        this.authService.attemptAuth(this.user.username, this.user.password).subscribe(
            data => {
                console.log('token is ' + data.token);
                this.tokenStorage.saveToken(data.token);
                this.routingService.goHome();
            },
            error => {
                this.alertService.error(error);
            });
    }

}
