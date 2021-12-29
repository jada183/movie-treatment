import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorComponent } from './components/error/error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
@NgModule({
  declarations: [
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule
  ],
  exports: [
    HeaderComponent,
    ErrorComponent,
    ReactiveFormsModule,
    MatInputModule,
    TranslateModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class SharedModule { }
