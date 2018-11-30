import {Component, OnInit, ViewChild} from '@angular/core';
import {News} from '../../models/news.model';
import {NewsService} from '../../shared/services/news.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/user.model';
import {UserService} from '../../shared/services/user.service';

@Component({
    selector: 'app-public-user-info',
    templateUrl: './public-user-info.component.html',
    styleUrls: ['./public-user-info.component.css']
})
export class PublicUserInfoComponent implements OnInit {
    news = new MatTableDataSource<News>();
    user: User = new User();
    anyUser = true;
    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor(private newsService: NewsService,
                private userService: UserService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                const userId = params['id'];
                this.newsService.getAllNewsByUser(userId).subscribe(
                    allNews => {
                        this.news.data = allNews;
                    });
                this.userService.getPublicUserInfo(userId).subscribe(
                    user => {
                        this.user = user;
                        console.log(user);
                    });
            });
        this.news.paginator = this.paginator;
    }

    onEditMode() {
        this.anyUser = !this.anyUser;
    }
}
