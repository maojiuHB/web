import {AfterViewInit, Component, ElementRef, Renderer} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService, StateStorageService} from '../../core';
import {EventManager, logger} from '../../shared';
import {Subscription} from 'rxjs';

@Component({
    selector: 'vn-session-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements AfterViewInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    isLogin = false;
    logoutListener: Subscription;

    constructor(
        private eventManager: EventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router) {
        this.credentials = {};
        this.logoutListener = eventManager.subscribe('meetingApp.logout', response => {
            this.loginService.logout();
        });
    }

    ngAfterViewInit() {
        setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
    }

    login() {
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.authenticationError = false;
                logger.log('login success');
                if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                    this.router.navigate(['']);
                }

                this.eventManager.broadcast({
                    name: 'authenticationSuccess',
                    content: 'Sending Authentication Success'
                });

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is succesful, go to stored previousState and clear previousState
                const redirect = this.stateStorageService.getUrl();
                if (redirect) {
                    this.stateStorageService.storeUrl(null);
                    this.router.navigate([redirect]);
                } else {
                    this.router.navigate(['']);
                }
            })
            .catch(() => {
                this.authenticationError = true;
            });
    }

}
