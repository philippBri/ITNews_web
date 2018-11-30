import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {News} from '../../models/news.model';
import {map} from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class NewsService {

    // selectedNews = new EventEmitter();
    //selectedNews: News;

    private userUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {
    }

    public addOrUpdateNews(news) {
        return this.http.post<News>(this.userUrl + '/createNews', news).pipe(map(
            news => {
                console.log(news);
                return news;
            }
        ));
    }

    public getAllNewsByUser(userId) {
        return this.http.get<News[]>(this.userUrl + '/newsList/' + userId);
    }

    public getPublicNews() {
        return this.http.get<News[]>(this.userUrl + '/news');
    }

    public deleteNews(news) {
        return this.http.delete(this.userUrl + '/newsList/' + news.id).pipe(map(
            (delNews: News) => {
                console.log('News with id = ' + delNews.id + 'and title = ' + delNews.title + 'was deleted!');
                return delNews;
            }));
    }

    public getNewsById(id) {
        return this.http.get<News>(this.userUrl + '/news/' + id).pipe(map(
            (newss: News) => {
                console.log(newss.tags);
                return newss;
            }
        ));
    }

    public searchNewsByPhrase(phrase) {
        return this.http.get<News[]>(this.userUrl + '/news/searchNewsByPhrase/' + phrase);
    }

    public searchNewsByTag(tag) {
        return this.http.get<News[]>(this.userUrl + '/news/searchNewsByTag/' + tag);
    }

    public searchNewsByCatrgory(category) {
        return this.http.get<News[]>(this.userUrl + '/news/searchNewsByCategory/' + category);
    }

}