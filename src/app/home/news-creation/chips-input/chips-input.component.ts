import {Component, OnInit} from '@angular/core';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {GlobalTagCreationService} from '../../../shared/services/global-tag-creation.service';

@Component({
    selector: 'app-chips-input',
    templateUrl: './chips-input.component.html',
    styleUrls: ['./chips-input.component.css']
})
export class ChipsInputComponent implements OnInit {

    // @Output() elementsChange = new EventEmitter();
    elements: string[];
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

    constructor(private globalNewsService: GlobalTagCreationService) {
    }

    ngOnInit() {
        this.elements = [];
        // if (this.globalNewsService.editMode) {
        this.globalNewsService.currentTags.subscribe(
            tags => {
                console.log('Эта хуйня срабатывает?');
                if (this.elements.length === 0 && (tags !== null || (tags !== null && tags.length !== 0))) {
                    for (const tag of tags) {
                        console.log('elements: ' + this.elements);
                        this.elements.push(tag.name);
                    }
                }
            }
        );
        // }

    }

    add(event: MatChipInputEvent): void {
        console.log('event: ' + event);
        const input = event.input;
        const value = event.value;
        console.log('elementsEE: ' + this.elements);
        console.log('value: ' + this.elements);
        // Add on elements
        if ((value || '').trim()) {
            this.elements.push(value.trim());
            // this.elementsChange.emit(this.elements);
            this.globalNewsService.changeTags(this.elements);
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    remove(el: string): void {
        const index = this.elements.indexOf(el);
        console.log(index);
        if (index >= 0) {
            this.elements.splice(index, 1);
        }
    }

}
