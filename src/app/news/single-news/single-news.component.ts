import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {News} from '../../models/news.model';
import {NewsService} from '../../shared/services/news.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RoutingService} from '../../shared/services/routing.service';

@Component({
    selector: 'app-single-news',
    templateUrl: './single-news.component.html',
    styleUrls: ['./single-news.component.css']
})
export class SingleNewsComponent implements OnInit{
    currentNews: News = new News();

    constructor(private newsService: NewsService,
                private routingService: RoutingService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.newsService.getNewsById(params['id']).subscribe(
                (news: News) => {
                    this.currentNews = news;
                });
        });

    }


    onReturn() {
        this.routingService.newsPage('all');
    }

    goToPublicUserInfo() {
        this.routingService.publicUserInfo(this.currentNews.user.id);
    }

}
