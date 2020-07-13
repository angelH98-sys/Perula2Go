import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { NgModule } from '@angular/core';

@NgModule({
    imports:[
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        MatButtonModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatDialogModule,
        MatChipsModule,
        MatExpansionModule,
        MatToolbarModule
    ],
    exports:[
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        MatButtonModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatDialogModule,
        MatChipsModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatSidenavModule,
        MatBadgeModule,
        MatListModule,
        MatTabsModule,
        MatStepperModule,
        MatSnackBarModule
    ]
})
export class MaterialModule{}