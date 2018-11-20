import {HttpResponse} from '@angular/common/http';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Principal, User, UserService} from '../../core';
import {EventManager, ITEMS_PER_PAGE, PAGE_SIZE_OPITONS, DIALOG_CONFIG, logger} from '../../shared';
import {MatDialog} from '@angular/material';
import {UserManagementDialogComponent} from './user-management-dialog/user-management-dialog.component';
import {Subscription} from 'rxjs';

/**
 * 用户管理
 * @ author limy
 * @ date 20181010 12:58
 */
@Component({
    selector: 'vn-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {
    // 当前登录用户
    currentAccount: any;
    // 用户数据
    users: User[] = [];
    // 数据数量总计
    queryCount = 0;
    // 当前页加载数量
    itemsPerPage = ITEMS_PER_PAGE;
    // 当前页
    page = 0;
    // 排序字段
    predicate = 'login';
    // 排序方式
    direction = 'asc';
    // 页数
    pageSizeOptions = PAGE_SIZE_OPITONS;
    // 是否正在加载
    isLoadingResults = false;
    // 表字段
    displayedColumns: string[] = ['login', 'email', 'firstName', 'lastName', 'authorities', 'operation'];

    eventSubscriber: Subscription;

    constructor(
        private userService: UserService,
        private principal: Principal,
        private eventManager: EventManager,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
            this.loadAll();
            this.registerChangeInUsers();
        });
    }

    // 注册改变 其他弹窗修改数据后 重新加载
    registerChangeInUsers() {
        this.eventSubscriber = this.eventManager.subscribe('userListModification', response => this.loadAll());
    }


    // 查询数据
    loadAll() {
        this.isLoadingResults = true;
        this.userService
            .query({
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<User[]>) => this.onSuccess(res.body, res.headers),
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
        this.users = data;
        this.isLoadingResults = false;
    }

    private onError(error) {
        logger.error(error);
        this.isLoadingResults = false;
    }

    // 显示添加弹窗
    showAddDialog(): void {
        this.dialog.open(UserManagementDialogComponent, Object.assign({}, DIALOG_CONFIG, {data: {operation: 'add'}}));
    }

    // 显示修改弹窗
    showEditDialog(data): void {
        this.dialog.open(UserManagementDialogComponent, Object.assign({}, DIALOG_CONFIG, {data: {operation: 'edit', payload: data}}));
    }

    // 显示修改弹窗
    showDelDialog(data): void {
        this.dialog.open(UserManagementDialogComponent, Object.assign({}, DIALOG_CONFIG, {data: {operation: 'del', payload: data}}));
    }

    // 显示查看弹窗
    showDialog(data): void {
        this.dialog.open(UserManagementDialogComponent, Object.assign({}, DIALOG_CONFIG, {data: {operation: 'show', payload: data}}));
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }
}
