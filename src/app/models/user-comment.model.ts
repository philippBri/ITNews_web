import {News} from './news.model';
import {User} from './user.model';

export class UserComment {
    id: number;
    user: User;
    dateCreation: string;
    text: string;
    news: News;
}