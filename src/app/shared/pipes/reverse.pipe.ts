import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'reverse'
})

export class ReversePipe implements PipeTransform {
    transform(value) {
        console.log(value);
        return value.slice().reverse();
    }
}