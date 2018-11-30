import {News} from './news.model';

export class Tag {
    id: number;
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}