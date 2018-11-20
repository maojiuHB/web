import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {ITEMS_PER_PAGE, logger, PAGE_SIZE_OPITONS} from 'src/app/shared';
import { Audit } from './audit.model';
import { AuditsService } from './audits.service';

@Component({
    selector: 'vn-audit',
    templateUrl: './audits.component.html',
    styleUrls: ['./audits.component.scss']
})
export class AuditsComponent implements OnInit, OnDestroy {
    // 审核数据
    audits: Audit[];
    // 开始时间
    fromDate: any;
    // 结束时间
    toDate: any;
    // 当前页加载数量
    itemsPerPage = ITEMS_PER_PAGE;
    // 数据数量总计
    queryCount = 0;
    // 当前页
    page = 0;
    // 排序字段
    predicate = 'auditEventDate';
    // 排序方式
    direction = 'desc';
    // 页数
    pageSizeOptions = PAGE_SIZE_OPITONS;
    // 是否正在加载
    isLoadingResults = false;
    // 表字段
    displayedColumns: string[] = ['auditEventDate', 'principal', 'auditEventType', 'data'];
    // 时间控件最大时间（当前时间加1）
    maxDate: any;
    constructor(
        private auditsService: AuditsService,
        private datePipe: DatePipe,
    ) { }

    ngOnInit() {
        this.today();
        this.previousMonth();
        this.loadAll();
    }

    ngOnDestroy() {
    }
    // 初始化开始时间 减一个月
    previousMonth() {
        let fromDate: Date = new Date();
        if (fromDate.getMonth() === 0) {
            fromDate = new Date(fromDate.getFullYear() - 1, 11, fromDate.getDate());
        } else {
            fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, fromDate.getDate());
        }
        this.fromDate = this.dateFormat(fromDate);
    }
    // 初始化结束时间 当前天加1
    today() {
        // Today + 1 day - needed if the current day must be included
        const today: Date = new Date();
        today.setDate(today.getDate() + 1);
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.toDate = this.dateFormat(date);
        this.maxDate = this.toDate;
    }
    // 格式化时间
    private dateFormat(date: Date): string {
        const dateFormat = 'yyyy-MM-dd';
        return this.datePipe.transform(date, dateFormat);
    }
    loadAll() {
        this.auditsService
            .query({
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort(),
                fromDate: this.dateFormat(this.fromDate),
                toDate: this.dateFormat(this.toDate),
            })
            .subscribe(
                (res: HttpResponse<Audit[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpResponse<any>) => this.onError(res.body)
            );
    }
    // 构建 排序
    private sort() {
        const result = [this.predicate + ',' + this.direction];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
    // 排序
    onSortChange(e) {
        this.predicate = e.active;
        this.direction = e.direction;
        this.page = 0;
        this.loadAll();
    }
    // 加载翻页
    loadPage(e) {
        this.page = e.pageIndex;
        this.itemsPerPage = e.pageSize;
        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.queryCount = headers.get('X-Total-Count');
        this.audits = data;
        this.isLoadingResults = false;
    }

    private onError(error) {
        logger.error(error);
        this.isLoadingResults = false;
    }
}
