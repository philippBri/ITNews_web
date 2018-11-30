import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Category} from '../../models/section.model';
import {Tag} from '../../models/tag.model';
import {map} from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserTagCategoryService {
    private userUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {
    }

    getCategories() {
        return this.http.get<Category[]>(this.userUrl + '/news/categories');
    }

    getTags() {
        return this.http.get<Tag[]>(this.userUrl + '/news/tags');
    }
}