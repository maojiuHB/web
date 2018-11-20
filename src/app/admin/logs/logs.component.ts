import {Component, OnInit, ViewChild} from '@angular/core';

import {Log} from './log.model';
import {LogsService} from './logs.service';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {ITEMS_PER_PAGE, logger, PAGE_SIZE_OPITONS} from 'src/app/shared';

@Component({
    selector: 'vn-logs',
    templateUrl: './logs.component.html'
})
export class LogsComponent implements OnInit {
    // 当前页加载数量
    itemsPerPage = ITEMS_PER_PAGE;
    // 页数
    pageSizeOptions = PAGE_SIZE_OPITONS;
    // 是否正在加载
    isLoadingResults = false;
    // 表字段
    displayedColumns: string[] = ['name', 'level', 'operation'];
    dataSource: MatTableDataSource<Log>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private logsService: LogsService) {
        this.isLoadingResults = true;
        this.logsService.findAll().subscribe(response => {
            this.dataSource = new MatTableDataSource(response.body);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.isLoadingResults = false;
        }, (error) => {
            logger.error(error);
            this.isLoadingResults = false;
        });
    }

    ngOnInit() {
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    // 更改级别
    changeLevel(name: string, level: string) {
        const log = new Log(name, level);
        this.isLoadingResults = true;
        this.logsService.changeLevel(log).subscribe(() => {
            this.logsService.findAll().subscribe(response => {
                this.dataSource = new MatTableDataSource(response.body);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.isLoadingResults = false;
            });
        });
    }
}
