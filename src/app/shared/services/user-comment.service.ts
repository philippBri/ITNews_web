import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserComment} from '../../models/user-comment.model';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserCommentService {
    private userUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {
    }

    addComment(newsId, comment) {
        return this.http.post<UserComment>(this.userUrl + '/createComment/' + newsId, comment);
    }

    getAllComment(id) {
        return this.http.get<UserComment[]>(this.userUrl + '/commentsList/' + id);
    }

    deleteComment(id) {
        return this.http.delete(this.userUrl + '/deleteComment/' + id);
    }
}