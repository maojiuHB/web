import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import { AuthServerProvider } from 'src/app/core';
import { Subscription } from 'rxjs';
import { CONFIG } from '../constants/vn.constants';
import { EventManager } from './event-manager.service';

@Injectable({
    providedIn: 'root'
})
export class TrackerService {
    stompClient = null;
    alreadyConnected = false;
    private subscription: Subscription;
    private reconnectTimeoutId: any;
    constructor(
        private authServerProvider: AuthServerProvider,
        private eventManager: EventManager,
        // tslint:disable-next-line: no-unused-variable
    ) {
    }
    connect() {
        if (this.alreadyConnected) {
            this.broadcastStatus();
            return;
        }
        let url = CONFIG.WS_URL;
        const authToken = this.authServerProvider.getToken();
        if (authToken) {
            url += '?access_token=' + authToken;
        }
        const socket = new SockJS(url);
        this.stompClient = Stomp.over(socket);
        const headers = {};
        this.stompClient.connect(headers, () => {
            this.alreadyConnected = true;
            this.clearSetTimeoutToReconnect();
            this.broadcastStatus();
        }, () => {
            console.error('disconnect webscoket');
            this.alreadyConnected = false;
            this.setTimeoutToReconnect();
        });
    }


    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            this.stompClient = null;
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        this.clearSetTimeoutToReconnect();
    }

    private broadcastStatus() {
        this.eventManager.broadcast({
            name: 'websocket',
            content: {}
        });
    }

    private clearSetTimeoutToReconnect() {
        if (this.reconnectTimeoutId) {
            clearTimeout(this.reconnectTimeoutId);
        }
    }
    private setTimeoutToReconnect() {
        this.clearSetTimeoutToReconnect();
        // 一秒重新连接
        this.reconnectTimeoutId = setTimeout(() => {
            this.connect();
        }, 1000);
    }
}
