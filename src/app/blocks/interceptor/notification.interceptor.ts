import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EventManager } from '../../shared';
import { MatSnackBar } from '@angular/material';
import { HTTP_ALERT } from '../../shared/constants/vn.constants';

export class NotificationInterceptor implements HttpInterceptor {
    // tslint:disable-next-line: no-unused-variable
    constructor(private eventManager: EventManager, private snackBar: MatSnackBar) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        const arr = event.headers.keys();
                        let alert = null;
                        let params = null;
                        arr.forEach(entry => {
                            if (entry.toLowerCase().endsWith('app-alert')) {
                                alert = event.headers.get(entry);
                            }
                            if (entry.toLowerCase().endsWith('app-params')) {
                                params = event.headers.get(entry);
                            }
                        });
                        if (alert) {
                            if (typeof alert === 'string') {
                                this.eventManager.broadcast({ name: 'httpSuccess', content: alert });
                                // 使用全局变量 转换提示信息为中文
                                let msg = HTTP_ALERT[alert];
                                // 添加其他字段提示
                                if (params) {
                                    msg = this.chinese(params) + (msg ? ' ' + msg : '');
                                }
                                this.addAlert(msg);
                            }
                        }
                    }
                }
            )
        );
    }
    private addAlert(message) {
        this.snackBar.open(message, '确定', {
            duration: 5000,
            verticalPosition: 'top',
        });
    }
    // 转换Unicode 编码为中文
    private chinese(ovalue) {
        if (ovalue) {
            const omt = ovalue, uReg = /\\u(\w{4})/img;
            if (uReg.test(ovalue)) {
                const ret = ovalue.replace(uReg, function (str, subs) {
                    return unescape('%u' + subs);
                });
                return ret;
            }
            return omt;
        }
    }
}
