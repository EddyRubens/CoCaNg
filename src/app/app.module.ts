// Angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Material modules
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

// 3rd party modules
import { CookieService } from 'ngx-cookie-service';

// App modules
import { AppComponent } from './app.component';
import { ISO_DATE_FORMATS } from './components/iso-date-formats';
import { TestimonyComponent } from './views/testimony/testimony.component';
import { CaptureComponent } from './views/capture/capture.component';
import { DetailedCaptureComponent } from './views/detailed-capture/detailed-capture.component';
import { DateDialogComponent } from './views/date-dialog/date-dialog.component';
import { CaptureInfoDialogComponent } from './views/capture-info-dialog/capture-info-dialog';
import { StatisticsComponent } from './views/statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    TestimonyComponent,
    CaptureComponent,
    DetailedCaptureComponent,
    DateDialogComponent,
    CaptureInfoDialogComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatMomentDateModule
  ],
  providers: [
    CookieService,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        floatLabel: 'always'
      }
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: ISO_DATE_FORMATS
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
