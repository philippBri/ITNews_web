import {Component, OnInit} from '@angular/core';
import {News} from '../models/news.model';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {


    news: News;
    searchWord = '';

    constructor() {
    }

    ngOnInit() {
    }

    onChangeSearchWord(event) {
        this.searchWord = event;
    }


}
