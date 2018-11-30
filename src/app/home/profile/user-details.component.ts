import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {GlobalService} from '../../shared/services/global.service';
import {UserService} from '../../shared/services/user.service';
import {TokenStorage} from '../../auth/token.storage';
import {ActivatedRoute, Router} from '@angular/router';
import { AlertService } from '../../shared/alert/alert.service';

@Component({
    selector: 'user-details-home',
    templateUrl: './user-details.component.html',
})
export class UserDetailsComponent implements OnInit {

    user: User = new User();
    isPublicInfo = false;


    confirmPassword = '';


    constructor(private globalService: GlobalService,
                private userService: UserService,
                private tokenStorage: TokenStorage,
                private router: Router,
                private alertService: AlertService) {
        // this.user = this.globalService.getCurrentUser();
    }

    ngOnInit() {
        this.getUserDetails();
        this.isPublicInfo = this.router.url.includes('publicUserInfo');

    }

    onSave() {
        this.userService.updateUserProfile(this.user).subscribe(
            (data: User) => {
                this.alertService.success('Profile info is successfully updated.');
            });
    }

    onCancel() {
        this.getUserDetails();
    }

    getUserDetails() {
        this.userService.getUserInfo(this.tokenStorage.getToken()).subscribe(
            (user: User) => {
                this.user = user;
                this.globalService.setLoginedUser(user);
            });
    }


}