import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {News} from '../../models/news.model';
import {NewsService} from '../../shared/services/news.service';
import {GlobalService} from '../../shared/services/global.service';
import {RoutingService} from '../../shared/services/routing.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'news-list-home',
    templateUrl: './news-list.component.html',
})

export class NewsListComponent implements OnInit {

    news: News[];

    constructor(private newsService: NewsService,
                private globalService: GlobalService,
                private routingService: RoutingService) {
    }

    ngOnInit() {
        // this.newsService.getAllNewsByUser(this.globalService.getCurrentUser().id).subscribe(
        //     data => {
        //         this.news = data;
        //     });
        this.globalService.currLoginedUser
            .map(loginUser => loginUser ? loginUser.id : Observable.empty())
            .switchMap(id => this.newsService.getAllNewsByUser(id))
            .subscribe(userNews => this.news = userNews);
    }

    onDeleteNews(delNews: News) {
        console.log(delNews);
        this.newsService.deleteNews(delNews).subscribe(
            (data: News) => {
                this.news = this.news.filter(n => n.id !== data.id);
            });
    }

    onEditNews(editNews: News) {
        this.routingService.editNews(editNews.id);
    }

}