import { Component, EventEmitter, Injector, Output } from '@angular/core';

import * as screenfull from 'screenfull';
import { Router } from '@angular/router';
import { LoginService } from '..';

@Component({
    selector: 'vn-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Output()
    toggleSidenav = new EventEmitter<void>();
    @Output()
    toggleNotificationSidenav = new EventEmitter<void>();
    private loginService: LoginService;

    constructor(
        private router: Router,
        private injector: Injector
    ) {
        setTimeout(() => (this.loginService = injector.get(LoginService)));
    }

    fullScreenToggle(): void {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['session', 'signin']);
    }
}
