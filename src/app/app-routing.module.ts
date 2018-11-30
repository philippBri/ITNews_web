import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserListComponent} from './admin/userList/user-list.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AllNewsComponent} from './news/all-news/all-news.component';
import {AuthGuard} from './auth/auth.guard';
import {HomeComponent} from './home/home.component';
import {NewsCreationComponent} from './home/news-creation/news-creation.component';
import {SingleNewsComponent} from './news/single-news/single-news.component';
import {NewsComponent} from './news/news.component';
import {UserDetailsComponent} from './home/profile/user-details.component';
import {NewsListComponent} from './home/news-list/news-list.component';
import {PublicUserInfoComponent} from './home/public-user-info/public-user-info.component';
import { PrivilegeGuard } from './auth/privilege.guard';

const routes: Routes = [
    {path: '', redirectTo: '/news/all', pathMatch: 'full'},
    {path: 'news', component: NewsComponent, children: [
            {path: 'all', component: AllNewsComponent},
            {path: ':id', component: SingleNewsComponent}
        ]},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'userList', component: UserListComponent, canActivate: [PrivilegeGuard]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
            {path: 'profile', component: UserDetailsComponent},
            {path: 'newsList', component: NewsListComponent},
            {path: 'editNews/new', component: NewsCreationComponent },
            {path: 'editNews/:id', component: NewsCreationComponent}
        ]},
    {path: 'publicUserInfo/:id', component: PublicUserInfoComponent},
    {path: 'userHomePage/:id/edit', component: PublicUserInfoComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule {
}
