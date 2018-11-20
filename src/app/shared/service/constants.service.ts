import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from '../constants/vn.constants';
import { TrackerService } from './tracker.service';

@Injectable({
    providedIn: 'root'
})
export class ConstantsService {
    constructor(
        private http: HttpClient,
    ) {
    }
    getConfig(): Observable<any> {
        return this.http.get<any>('assets/data/config.json?' + new Date().getTime());
    }
    initConstants() {
        this.getConfig().subscribe(config => {
            Object.assign(CONFIG, config);
        });
    }
}
