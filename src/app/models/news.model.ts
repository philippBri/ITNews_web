import {User} from './user.model';
import {Category} from './section.model';

export class News {
    id: number;
    title: string;
    description: string;
    text: string;
    creationDate: string;
    user: User;
    category: Category;
    tags: any[] = []; // should be Tag or string
    constructor() {
        this.user = new User();
        this.category = new Category();
    }
}