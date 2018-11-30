import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../shared/services/news.service';
import {News} from '../../models/news.model';
import {RoutingService} from '../../shared/services/routing.service';
import {GlobalNewsSearchService} from '../../shared/services/global-news-search.service';

@Component({
    selector: 'app-all-news',
    templateUrl: './all-news.component.html',
    styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

    news: News[];
    username = '';

    constructor(public routingService: RoutingService,
                private newsService: NewsService,
                private gNewsSearchService: GlobalNewsSearchService) {
    }

    ngOnInit() {
        this.newsService.getPublicNews().subscribe(
            data => {
                this.gNewsSearchService.changeNewsList(data);
                this.news = data;
            });
        this.gNewsSearchService.currentNewsList.subscribe(
            data => this.news = data
        );
    }

    onReadMore(news: News) {
        this.routingService.newsPage(news.id);
    }

    goToPublicUserInfo(news: News) {
        this.routingService.publicUserInfo(news.user.id);
    }
}
