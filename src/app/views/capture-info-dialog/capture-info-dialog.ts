import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { Capture } from 'src/app/models/capture';
import { KnownPages } from 'src/app/models/known-pages';

@Component({
  selector: 'app-capture-info-dialog',
  templateUrl: './capture-info-dialog.html',
  styleUrls: ['./capture-info-dialog.scss']
})
export class CaptureInfoDialogComponent implements OnInit {

  constructor(private stateService: StateService, public dialogRef: MatDialogRef<CaptureInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  public openDetailedCapture(capture: Capture) {
    this.stateService.selectedCapture = capture; // Prepare data
    this.stateService.selectedPage = KnownPages.DetailedCapture; // Display DetailedCapture view
    this.dialogRef.close(); // Close dialog
  }

  public showAllOfThisCamera(capture: Capture) {
    this.stateService.selectCamera(capture.camera.id);
    this.stateService.selectHour(-1);
    this.stateService.filters.onlyLatest = false;
    this.stateService.searchCaptures();
    this.stateService.selectedPage = KnownPages.Captures; // Display Capture view
    this.dialogRef.close(); // Close dialog
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
