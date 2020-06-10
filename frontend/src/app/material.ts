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

import { NgModule } from '@angular/core';

@NgModule({
    imports:[
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        MatButtonModule,
        MatDividerModule
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
        MatDividerModule
    ]
})
export class MaterialModule{}