import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { VN_TITLE } from './shared/constants/vn.constants';
import { Principal } from './core';

@Component({
    selector: 'vn-root',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
    account: Account;
    constructor(
        private titleService: Title,
        private router: Router,
        private principal: Principal,
    ) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : '未知页面';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root) + VN_TITLE);
            }
        });
        this.principal.identity().then(account => {
            this.account = account;
        });
    }
}
