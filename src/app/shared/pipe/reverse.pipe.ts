import { IterableDiffers, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reverse',
    pure: false
})
export class ReversePipe implements PipeTransform {

    differs: any;
    cashed: any;

    constructor(private _differs: IterableDiffers) {
        this.differs = this._differs.find([]).create(null);
    }

    /**
     * Takes a value and makes it lowercase.
     */
    transform(value, ...args) {
        const changes = this.differs.diff(value);
        if (changes) {
            this.cashed = value.slice().reverse();
        }
        return this.cashed;
    }
}
