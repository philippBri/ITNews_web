import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NewsService} from '../../shared/services/news.service';
import {GlobalNewsSearchService} from '../../shared/services/global-news-search.service';
import {Category} from '../../models/section.model';
import {UserTagCategoryService} from '../../shared/services/user-tag-category.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

    searchInput = '';
    categories: Category[];
    allNewsUrl = '/news/all';
    @Output() searchWordChange = new EventEmitter<string>();

    constructor(private newsService: NewsService,
                private categoryService: UserTagCategoryService,
                private globalNewsSearchService: GlobalNewsSearchService,
                private router: Router) {
    }

    ngOnInit() {
        this.categoryService.getCategories().subscribe(
            data => this.categories = data
        );
    }

    onSearchByPhrase() {
        this.navigateToNewsPage();
        this.searchWordChange.emit(this.searchInput.toLowerCase());
        this.newsService.searchNewsByPhrase(this.searchInput.toLowerCase()).subscribe(
            data => this.globalNewsSearchService.changeNewsList(data)
        );
    }

    onSearchByCategory(category: Category) {
        this.navigateToNewsPage();
        this.searchWordChange.emit(category.name);
        this.newsService.searchNewsByCatrgory(category.id).subscribe(
            data => this.globalNewsSearchService.changeNewsList(data)
        );
    }

    onSearchByTag(tag: string) {
        this.navigateToNewsPage();
        this.searchWordChange.emit(tag);
        this.newsService.searchNewsByTag(tag).subscribe(
            data => this.globalNewsSearchService.changeNewsList(data)
        );
    }

    navigateToNewsPage() {
        if (this.router.url !== this.allNewsUrl) {
            this.router.navigate([this.allNewsUrl]);
        }
    }


}
