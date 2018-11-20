import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User, UserService } from 'src/app/core';
import { EventManager } from 'src/app/shared';

@Component({
  selector: 'vn-user-management-dialog',
  templateUrl: './user-management-dialog.component.html',
  styleUrls: ['./user-management-dialog.component.scss']
})
export class UserManagementDialogComponent implements OnInit {
  // 当前操作
  operation: string;
  // 保存中
  isSaving = false;
  // 用户信息
  user: User = new User();
  // 权限信息
  authorities: any[];
  constructor(
    public dialogRef: MatDialogRef<UserManagementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private eventManager: EventManager,
  ) {
    this.operation = data.operation;
    if (data.payload) {
      Object.assign(this.user, data.payload);
    }
  }

  ngOnInit() {
    this.isSaving = false;
    this.authorities = [];
    this.userService.authorities().subscribe(authorities => {
      this.authorities = authorities;
    });
  }

  // 保存 || 修改
  save() {
    this.isSaving = true;
    if (this.user.id !== null) {
      if (this.user.password == null || this.user.password === '') {
        this.user.password = 'videon';
      }
      this.userService.update(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
    } else {
      this.userService.create(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
    }
  }
  // 删除
  delete() {
    this.userService.delete(this.user.login).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
  }
  private onSaveSuccess(result) {
    this.isSaving = false;
    this.eventManager.broadcast({
      name: 'userListModification'
    });
    this.dialogRef.close();
  }

  private onSaveError() {
    this.isSaving = false;
  }

}
