import {Component, OnInit} from '@angular/core';
import {UserComment} from '../../../models/user-comment.model';
import {UserCommentService} from '../../../shared/services/user-comment.service';
import {ActivatedRoute} from '@angular/router';
import {GlobalService} from '../../../shared/services/global.service';
import {News} from '../../../models/news.model';
import {RoutingService} from '../../../shared/services/routing.service';

@Component({
    selector: 'app-comments-area',
    templateUrl: './comments-area.component.html',
    styleUrls: ['./comments-area.component.css']
})
export class CommentsAreaComponent implements OnInit {

    userIsLoggined = false;

    comments: UserComment[];
    newsId: number;

    constructor(private commentService: UserCommentService,
                private route: ActivatedRoute,
                private globalService: GlobalService,
                private routingService: RoutingService) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.newsId = params['id'];
                this.commentService.getAllComment(this.newsId).subscribe(
                    comments => {
                        this.comments = comments;
                    });
            });

        this.globalService.currLoginedUser.subscribe(
            user => {
                if (user == null) {
                    this.userIsLoggined = false;
                } else {
                    this.userIsLoggined = true;
                }
            }
        );
    }

    onDeleteComment(id) {
        this.commentService.deleteComment(id).subscribe(
            value => {
                this.refreshCommentsArea();
            });
    }

    refreshCommentsArea() {
        this.commentService.getAllComment(this.newsId).subscribe(
            comments => {
                this.comments = comments;
            });
    }

    goToPublicUserInfo(id) {
        this.routingService.publicUserInfo(id);
    }


}
