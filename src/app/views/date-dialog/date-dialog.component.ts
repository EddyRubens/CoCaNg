import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-date-dialog',
  templateUrl: './date-dialog.component.html',
  styleUrls: ['./date-dialog.component.scss']
})
export class DateDialogComponent {
  public selectedDate: Date;

  constructor (@Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedDate = data.selectedDate;
  }
}
