import {Component, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {CloudData, CloudOptions} from 'angular-tag-cloud-module/tag-cloud.interfaces';
import {UserTagCategoryService} from '../../shared/services/user-tag-category.service';
import {Tag} from '../../models/tag.model';
import {TagCloudComponent, ZoomOnHoverOptions} from 'angular-tag-cloud-module';


@Component({
    selector: 'app-tags-cloud',
    templateUrl: './tags-cloud.component.html',
    styleUrls: ['./tags-cloud.component.css']
})
export class TagsCloudComponent implements OnInit {


    @ViewChild(TagCloudComponent) tagCloudComponent: TagCloudComponent;
    @Output() onTagSelection = new EventEmitter<string>();

    wHeight = window.innerHeight * 0.25;
    wWidth = window.innerWidth * 0.25;

    options: CloudOptions = {
        // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
        width: this.wWidth,
        height: this.wHeight,
        overflow: false,
        realignOnResize: true,
    };

    zoomOnHoverOptions: ZoomOnHoverOptions = {
        scale: 1.5, // Elements will become 130 % of current zize on hover
        transitionTime: 1.2, // it will take 1.2 seconds until the zoom level defined in scale property has been reached
        delay: 0 // Zoom will take affect after 0.8 seconds
    };

    data: CloudData[] = [
        {text: '', weight: 10},
    ];


    constructor(private tagService: UserTagCategoryService) {
    }

    ngOnInit() {
        this.tagService.getTags().subscribe(
            (tags: Tag[]) => {
                let i = 5;
                for (const tag of tags) {
                    this.data.push({
                        text: tag.name,
                        weight: i,
                        color: 'red'
                    });
                    i = i - 0.25;
                }
                this.onResize();
            }
        );

    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.options.height = document.getElementsByName('PopularTagsElement').item(0).offsetHeight;
        this.options.width = document.getElementsByName('PopularTagsElement').item(0).offsetWidth;
        this.tagCloudComponent.reDraw();
    }

    onTagClick(event: CloudData) {
        this.onTagSelection.emit(event.text);
    }


}
