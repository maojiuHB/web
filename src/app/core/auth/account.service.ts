import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AccountService {
    constructor(private http: HttpClient) {}

    get(): Observable<HttpResponse<Account>> {
        return this.http.get<Account>( 'api/account', { observe: 'response' });
    }

    save(account: any): Observable<HttpResponse<any>> {
        return this.http.post( 'api/account', account, { observe: 'response' });
    }

    savePassword(newPassword: string, currentPassword: string): Observable<any> {
        return this.http.post('api/account/change-password', { currentPassword, newPassword });
    }
}
