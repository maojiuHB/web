import {MatPaginatorIntl} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable()
export class PaginatorIntl extends MatPaginatorIntl {
    constructor() {
        super();
        this.getAndInitTranslations();
    }

    getAndInitTranslations() {
        this.itemsPerPageLabel = '每页显示数量';
        this.nextPageLabel = '下一页';
        this.previousPageLabel = '上一页';
        this.firstPageLabel = '第一页';
        this.lastPageLabel = '最后一页';
        this.changes.next();
    }

    getRangeLabel = (page: number, pageSize: number, length: number) =>  {
        if (length === 0 || pageSize === 0) {
            return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} / ${length}`;
    }
}
