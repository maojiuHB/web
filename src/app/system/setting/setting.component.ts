import { Component, OnInit } from '@angular/core';
import { AccountService, Principal } from '../../core';

@Component({
    selector: 'vn-session-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
    settingsAccount: any;
    isSaving: boolean;
    // 密码
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    constructor(
        private account: AccountService,
        private principal: Principal) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.principal.identity().then(account => {
            this.settingsAccount = this.copyAccount(account);
        });
    }

    save() {
        this.isSaving = true;
        this.account.save(this.settingsAccount).subscribe(
            () => {
                this.principal.identity(true).then(account => {
                    this.settingsAccount = this.copyAccount(account);
                    this.isSaving = false;
                });
            },
            () => {
                this.isSaving = false;
            }
        );
    }
    changePassword() {
        this.isSaving = true;
        this.account.savePassword(this.newPassword, this.currentPassword).subscribe(
            () => {
                this.isSaving = false;
            },
            () => {
                this.isSaving = false;
            }
        );
    }
    private copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            authorities: account.authorities,
            lastName: account.lastName,
            login: account.login,
            id: account.id
        };
    }
}
