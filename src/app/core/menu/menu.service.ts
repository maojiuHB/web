import { Injectable } from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}

export interface ChildrenItems {
    state: any;
    name: string;
    type?: string;
}

export interface Menu {
    state?: any;
    name: string;
    type: string;
    icon: string;
    auth: string;
    badge?: BadgeItem[];
    children?: ChildrenItems[];
}

const MENUITEMS = [
    {
        state: ['/', '/'],
        name: '主页',
        type: 'link',
        icon: 'explore',
        auth: 'ROLE_USER',
    }, {
        state: 'admin',
        name: '系统管理',
        type: 'sub',
        icon: 'settings',
        auth: 'ROLE_ADMIN',
        badge: [{ type: 'red', value: '5' }],
        children: [
            { state: ['/', 'admin', 'user-management'], name: '用户管理' },
            { state: ['/', 'admin', 'audits'], name: '审核' },
            { state: ['/', 'admin', 'logs'], name: '日志' },
            { state: ['/', 'admin', 'health'], name: '健康检查' },
            { state: ['/', 'admin', 'docs'], name: 'API' },
        ]
    }, {
        state: 'http://www.videon.cn',
        name: '帮助',
        type: 'extTabLink',
        icon: 'bookmark',
        auth: 'ROLE_USER',
    }
];

@Injectable()
export class MenuService {
    getAll(): Menu[] {
        return MENUITEMS;
    }

    add(menu) {
        MENUITEMS.push(menu);
    }
}
