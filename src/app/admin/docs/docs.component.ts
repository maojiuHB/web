import { Component } from '@angular/core';

@Component({
    selector: 'vn-docs',
    templateUrl: './docs.component.html'
})
export class DocsComponent {
    height = 1024;
    constructor() {
        this.height = window.innerHeight - 85;
    }
}
