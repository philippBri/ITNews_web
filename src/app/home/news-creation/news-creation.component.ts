import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {News} from '../../models/news.model';
import {NewsService} from '../../shared/services/news.service';
import {GlobalService} from '../../shared/services/global.service';
import {RoutingService} from '../../shared/services/routing.service';
import {AlertService} from '../../shared/alert/alert.service';
import {Category} from '../../models/section.model';
import {UserTagCategoryService} from '../../shared/services/user-tag-category.service';
import {GlobalTagCreationService} from '../../shared/services/global-tag-creation.service';

@Component({
    selector: 'news-creation',
    templateUrl: './news-creation.component.html',
    styleUrls: ['./news-creation.component.css']
})
export class NewsCreationComponent implements OnInit, OnDestroy {
    id: number;
    editMode = false;
    news = new News();
    categories: Category[];
    //tags: Tag[] = [];
    // selectedCategory: number;

    constructor(private routingService: RoutingService,
                private newsService: NewsService,
                private route: ActivatedRoute,
                private globalService: GlobalService,
                private alertService: AlertService,
                private tagCategoryService: UserTagCategoryService,
                private globalNewsService: GlobalTagCreationService) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = params['id'];
                this.editMode = !isNaN(this.id);
                console.log(this.editMode);
                if (this.editMode) {
                    this.newsService.getNewsById(this.id).subscribe(
                        value => {
                            this.news = value;
                            this.globalNewsService.changeTags(value.tags);
                        }
                    );
                }
            });
        this.tagCategoryService.getCategories().subscribe(
            cate =>
                this.categories = cate
        );
    }

    ngOnDestroy() {
        this.globalNewsService.refresh();
    }

    onCreateNews() {

        this.globalNewsService.currentTags.subscribe(
            value => {
                this.news.tags = value;
            }
        );

        console.log(this.news);
        this.newsService.addOrUpdateNews(this.news).subscribe(
            data => {
                this.alertService.success(this.editMode ? 'News successfully updated.' : 'News successfully created.');
            },
            error => {
                this.alertService.error(error.error);
            });
    }

    onCancel() {
        this.routingService.newsList();
    }

    onElementsChange(elements) {
        console.log(elements);
        this.news.tags = elements;
    }

}
