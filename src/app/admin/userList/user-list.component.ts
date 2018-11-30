import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../../models/user.model';
import {UserService} from '../../shared/services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user-list.component.html',
    styles: []
})
export class UserListComponent implements OnInit {

    users: User[];

    constructor(private router: Router,
                private userService: UserService) {

    }

    ngOnInit() {
        this.userService.getUsers()
            .subscribe(data => {
                this.users = data;
            });
    }

    deleteUser(user: User) {
        if (confirm('Are you sure to delete ' + user.username)) {
            this.userService.deleteUser(user)
                .subscribe((data: User) => {
                    this.users = this.users.filter(u => u.id !== data.id);

                });
        }

    }

    lockUnlockUser(user: User) {
        this.userService.blockUser(user)
            .switchMap(_ => this.userService.getUsers())
            .subscribe(u => this.users = u);
    }

    edit(user: User) {
        this.router.navigate(['userHomePage/' + user.id + '/edit']);
    }

}


