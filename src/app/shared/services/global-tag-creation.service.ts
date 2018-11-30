import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NewsService} from './news.service';
// **********************
// переделать эту хуйню
// **********************

@Injectable()
export class GlobalTagCreationService {
    editMode = false;
    private tagsSubject = new BehaviorSubject(null);
    currentTags = this.tagsSubject.asObservable();

    constructor(private newsService: NewsService) {
    }

    changeTags(tags) {
        this.editMode = true;
        this.tagsSubject.next(tags);
    }

    refresh() {
        this.tagsSubject.next([]);
        // this.tagsSubject.unsubscribe();
        this.editMode = false;

    }
}
