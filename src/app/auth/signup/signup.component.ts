import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {AlertService} from '../../shared/alert/alert.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    user: User = new User();
    signupForm: FormGroup;

    constructor(private router: Router,
                private userService: UserService,
                private alertService: AlertService) {
    }

    ngOnInit() {
        this.signupForm = new FormGroup({
            'username': new FormControl(null, Validators.required, this.asyncUsernameValidator.bind(this)),
            'password': new FormControl(null, Validators.required),
            'email': new FormControl(null, [Validators.required, Validators.email])
        });
    }

    onSignUp() {
        this.setUserValues();
        this.userService.signUp(this.user).subscribe(
            (data: User) => {
                this.alertService.success('User successfully created!');
            });
    }

    setUserValues() {
        this.user.role = 'ROLE_USER';
        this.user.username = this.signupForm.get('username').value;
        this.user.password = this.signupForm.get('password').value;
        this.user.email = this.signupForm.get('email').value;
    }


    asyncUsernameValidator(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>(((resolve, reject) => {

            this.userService.isUserExist(control.value).subscribe(value => {
                if (value) {
                    resolve({'usernameIsForbidden': true});
                } else {
                    resolve(null);
                }
            });

        }));
        return promise;
    }
}
