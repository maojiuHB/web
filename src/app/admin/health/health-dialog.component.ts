import { Component, Inject } from '@angular/core';

import { HealthService } from './health.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'vn-health-dialog',
    templateUrl: './health-dialog.component.html'
})
export class HealthDialogComponent {
    currentHealth: any;
    displayedColumns: string[] = ['key', 'value'];
    constructor(
        private healthService: HealthService,
        public dialogRef: MatDialogRef<HealthDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.currentHealth = data;
    }

    baseName(name) {
        return this.healthService.getBaseName(name);
    }

    subSystemName(name) {
        return this.healthService.getSubSystemName(name);
    }

    readableValue(value: number) {
        if (this.currentHealth.name === 'diskSpace') {
            // Should display storage space in an human readable unit
            const val = value / 1073741824;
            if (val > 1) {
                // Value
                return val.toFixed(2) + ' GB';
            } else {
                return (value / 1048576).toFixed(2) + ' MB';
            }
        }

        if (typeof value === 'object') {
            return JSON.stringify(value);
        } else {
            return value.toString();
        }
    }
}
