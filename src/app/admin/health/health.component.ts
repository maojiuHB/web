import { Component, OnInit, ViewChild } from '@angular/core';

import { HealthService } from './health.service';
import { HealthDialogComponent } from './health-dialog.component';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { DIALOG_CONFIG, ITEMS_PER_PAGE, PAGE_SIZE_OPITONS } from 'src/app/shared';

@Component({
    selector: 'vn-health',
    templateUrl: './health.component.html'
})
export class HealthCheckComponent implements OnInit {
    // 当前页加载数量
    itemsPerPage = ITEMS_PER_PAGE;
    // 页数
    pageSizeOptions = PAGE_SIZE_OPITONS;
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    updatingHealth: boolean;
    // 表字段
    displayedColumns: string[] = ['name', 'status', 'operation'];
    constructor(private healthService: HealthService, public dialog: MatDialog) { }

    ngOnInit() {
        this.refresh();
    }

    baseName(name: string) {
        return this.healthService.getBaseName(name);
    }

    getBadgeClass(statusState) {
        if (statusState === 'UP') {
            return 'badge-success';
        } else {
            return 'badge-danger';
        }
    }

    refresh() {
        this.updatingHealth = true;

        this.healthService.checkHealth().subscribe(
            health => {
                this.dataSource = new MatTableDataSource(this.healthService.transformHealthData(health));
                this.dataSource.paginator = this.paginator;
                this.updatingHealth = false;
            },
            error => {
                if (error.status === 503) {
                    this.dataSource = new MatTableDataSource(this.healthService.transformHealthData(error.error));
                    this.updatingHealth = false;
                }
            }
        );
    }

    showHealth(health: any) {
        this.dialog.open(HealthDialogComponent, Object.assign({}, DIALOG_CONFIG, { data: health }));
    }

    subSystemName(name: string) {
        return this.healthService.getSubSystemName(name);
    }
}
