import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fori', pure: false })
export class ForiPipe implements PipeTransform {
    transform(value, args: string[]): any {
        const res = [];
        for (let i = 0; i < value; i++) {
            res.push(i);
        }
        return res;
    }
}
