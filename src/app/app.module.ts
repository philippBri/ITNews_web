import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {UserListComponent} from './admin/userList/user-list.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './auth/login/login.component';
import {AllNewsComponent} from './news/all-news/all-news.component';
import {HeaderComponent} from './header/header.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthGuard} from './auth/auth.guard';
import {PrivilegeGuard} from './auth/privilege.guard';
import {AuthService} from './auth/auth.service';
import {TokenStorage} from './auth/token.storage';
import {Interceptor} from './auth/interceptor';
import {HomeComponent} from './home/home.component';
import {SingleNewsComponent} from './news/single-news/single-news.component';
import {UserDetailsComponent} from './home/profile/user-details.component';
import {NewsListComponent} from './home/news-list/news-list.component';
import {GlobalService} from './shared/services/global.service';
import {NgxEditorModule} from 'ngx-editor';
import {TooltipModule} from 'ngx-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NewsCreationComponent} from './home/news-creation/news-creation.component';
import {NewsService} from './shared/services/news.service';
import {UserService} from './shared/services/user.service';
import {NewsComponent} from './news/news.component';
import {ShortenTextPipe} from './shared/pipes/shorten-text.pipe';
import {CommentsAreaComponent} from './news/single-news/comments-area/comments-area.component';
import {CommentCreationComponent} from './news/single-news/comments-area/comment-creation/comment-creation.component';
import {UserCommentService} from './shared/services/user-comment.service';
import {ReversePipe} from './shared/pipes/reverse.pipe';
import {RoutingService} from './shared/services/routing.service';
import {AlertComponent} from './shared/alert/alert.component';
import {AlertService} from './shared/alert/alert.service';
import { PublicUserInfoComponent } from './home/public-user-info/public-user-info.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatListModule, MatMenuModule,
    MatPaginatorModule, MatSelectModule,
    MatTableModule
} from '@angular/material';
import { ChipsInputComponent } from './home/news-creation/chips-input/chips-input.component';
import {UserTagCategoryService} from './shared/services/user-tag-category.service';
import {GlobalTagCreationService} from './shared/services/global-tag-creation.service';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { TagsCloudComponent } from './news/tags-cloud/tags-cloud.component';
import { SideBarComponent } from './news/side-bar/side-bar.component';
import {GlobalNewsSearchService} from './shared/services/global-news-search.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}


@NgModule({
    declarations: [
        AppComponent,
        UserListComponent,
        LoginComponent,
        AllNewsComponent,
        HeaderComponent,
        SignupComponent,
        HomeComponent,
        SingleNewsComponent,
        UserDetailsComponent,
        NewsListComponent,
        NewsCreationComponent,
        NewsComponent,
        ShortenTextPipe,
        CommentsAreaComponent,
        CommentCreationComponent,
        ReversePipe,
        AlertComponent,
        PublicUserInfoComponent,
        ChipsInputComponent,
        TagsCloudComponent,
        SideBarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxEditorModule,
        TooltipModule.forRoot(),
        AngularFontAwesomeModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatCardModule,
        MatListModule,
        MatChipsModule,
        MatIconModule,
        MatSelectModule,
        TagCloudModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
            }
        )
    ],
    providers: [UserService,
        AuthGuard,
        AuthService,
        PrivilegeGuard,
        AlertService,
        RoutingService,
        UserCommentService,
        NewsService,
        GlobalService,
        GlobalTagCreationService,
        GlobalNewsSearchService,
        TokenStorage,
        UserTagCategoryService,
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
