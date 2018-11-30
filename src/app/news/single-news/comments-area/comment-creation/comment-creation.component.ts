import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../../shared/services/global.service';
import {UserCommentService} from '../../../../shared/services/user-comment.service';
import {UserComment} from '../../../../models/user-comment.model';
import {NewsService} from '../../../../shared/services/news.service';
import {News} from '../../../../models/news.model';

@Component({
    selector: 'app-comment-creation',
    templateUrl: './comment-creation.component.html',
    styleUrls: ['./comment-creation.component.css']
})
export class CommentCreationComponent implements OnInit {

    @Output() commentChange = new EventEmitter();

    comment: UserComment = new UserComment();
    newsId: number;

    constructor(private route: ActivatedRoute,
                private globalService: GlobalService,
                private commentService: UserCommentService,
                private newsService: NewsService) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                // this.newsId = params['id'];
                // this.comment.news = this.newsService.getNewsById(params['id']);
                this.newsId = params['id'];
            });
        // this.comment.user = this.globalService.getCurrentUser().username;
    }

    onAddComment() {
        this.commentService.addComment(this.newsId, this.comment).subscribe(
            value => {
                console.log('UserComment added!');
                this.commentChange.emit();
            });
        this.comment.text = '';
    }
}
