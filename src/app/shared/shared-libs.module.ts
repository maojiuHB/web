import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CookieModule} from 'ngx-cookie';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule, MatListModule, MatSelectModule, MatSlideToggleModule, MatTabsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatProgressBarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
@NgModule({
    imports: [
        CookieModule.forRoot(),
    ],
    exports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FlexLayoutModule,
        MatAutocompleteModule,
        MatToolbarModule,
        MatTabsModule,
        MatListModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatProgressBarModule
    ]
})
export class SharedLibsModule {
}
