import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoutingService} from '../shared/services/routing.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    @Input() isProfile = true;

    constructor(private routingService: RoutingService) {
    }

    ngOnInit() {
        this.routingService.profilePage();
    }

    onEditNews() {
        this.routingService.editNews('new');
    }
}
