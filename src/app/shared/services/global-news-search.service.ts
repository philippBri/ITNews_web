import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {News} from '../../models/news.model';

@Injectable()
export class GlobalNewsSearchService {
    private newsSubject = new BehaviorSubject(null);
    currentNewsList = this.newsSubject.asObservable();

    constructor() {
    }

    changeNewsList(news: News[]) {
        this.newsSubject.next(news);
    }
}