import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { EventManager } from '../../shared';
import { HTTP_ALERT, CONFIG } from 'src/app/shared/constants/vn.constants';

export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private eventManager: EventManager, private snackBar: MatSnackBar) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => { },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (!(err.status === 401 && (err.message === '' || (err.url && err.url.includes('/api/account'))))) {
                            if (this.eventManager !== undefined) {
                                this.eventManager.broadcast({ name: 'httpError', content: err });
                            }
                            let i;
                            switch (err.status) {
                                // connection refused, server not reachable
                                case 0:
                                    this.addAlert('服务器未找到');
                                    break;
                                case 400:
                                    const arr = err.headers.keys();
                                    let errorHeader = null;
                                    let entityKey = null;
                                    arr.forEach(entry => {
                                        if (entry.toLowerCase().endsWith('app-error')) {
                                            errorHeader = err.headers.get(entry);
                                        } else if (entry.toLowerCase().endsWith('app-params')) {
                                            entityKey = err.headers.get(entry);
                                        }
                                    });
                                    if (errorHeader) {
                                        this.addAlert(errorHeader, entityKey);
                                    } else if (err.error !== '' && err.error.fieldErrors) {
                                        const fieldErrors = err.error.fieldErrors;
                                        for (i = 0; i < fieldErrors.length; i++) {
                                            const fieldError = fieldErrors[i];
                                            if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
                                                fieldError.message = 'Size';
                                            }
                                            // convert 'something[14].other[4].id' to 'something[].other[].id'
                                            // so translations can be written to it
                                            const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                                            const fieldName = convertedField.charAt(0).toUpperCase() + convertedField.slice(1);
                                            this.addAlert(fieldName, fieldError.message);
                                        }
                                    } else if (err.error !== '' && err.error.title) {
                                        this.addAlert(
                                            err.error.title
                                        );
                                    } else if (err.error !== '' && err.error.message) {
                                        this.addAlert(
                                            err.error.message,
                                            err.error.params
                                        );
                                    } else {
                                        this.addAlert(err.error);
                                    }
                                    break;
                                case 404:
                                    this.addAlert('请求未找到');
                                    break;
                                case 401:
                                    this.addAlert('登录失败');
                                    break;
                                case 500:
                                    this.addAlert('服务端发生错误');
                                    break;
                                default:
                                    if (err.error !== '' && err.error.message) {
                                        this.addAlert(err.error.message);
                                    } else {
                                        this.addAlert(err.error);
                                    }
                            }
                        }
                    }
                }
            )
        );
    }
    private addAlert(message, key?) {
        let msg = '';
        if (key && key.indexOf('.') <= 0) {
            msg += (HTTP_ALERT[key] ? HTTP_ALERT[key] : this.chinese(key)) + ' ';
        }
        if (message) {
            msg += (HTTP_ALERT[message] ? HTTP_ALERT[message] : message);
        }
        this.snackBar.open(msg, '关闭', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: 'error-snackbar'
        });
        // 自动下载错误文件
        if (key && key.indexOf('.') > 0) {
            // 延时出现弹窗下载
            setTimeout(() => {
                // 创建隐藏的可下载链接
                const eleLink = document.createElement('a');
                // 下载文件名称
                eleLink.download = key;
                eleLink.style.display = 'none';
                // 字符内容转变成blob地址 下载地址
                eleLink.href = CONFIG.UPLOAD_URL + key;
                // 触发点击
                document.body.appendChild(eleLink);
                eleLink.click();
                // 然后移除
                document.body.removeChild(eleLink);
            }, 1000);

        }
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
