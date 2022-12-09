import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { UnsubscribeOnDestroy } from 'src/app/components/UnsubscribeOnDestroy';
import { Camera } from 'src/app/models/camera';
import { CoCaService } from 'src/app/services/coca.service';
import { StateService } from 'src/app/services/state.service';
import { DateDialogComponent } from '../date-dialog/date-dialog.component';
import { CameraDialogComponent } from '../camera-dialog/camera-dialog.component';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent extends UnsubscribeOnDestroy implements OnInit {
  public filters = {
    selectedDate: new Date(new Date().valueOf() + (-(new Date()).getTimezoneOffset() * 60 * 1000)),
    selectedHour: -1,
    selectedCamera: 'All',
    onlyLatest: true
  };
  public cameras: Camera[] = [];

  constructor(public cocaService: CoCaService, public dialog: MatDialog, public stateService: StateService) {
    super(); // Needed for UnsubscribeOnDestroy
  }

  ngOnInit(): void {
    this.loadCameras();
  }

  private loadCameras() {
    this.subs.sink = this.cocaService.getCameras().subscribe({
      next: cameras => {
        this.cameras = cameras;
      }
    });
  }

  public selectDate(event: any) {
    const element = document.elementFromPoint(event.x, event.y);
    const rect = element ? element.getBoundingClientRect(): { top: 0, left: 0 };
    const dialogRef = this.dialog.open(DateDialogComponent, {
      position: {top: (rect.top + 27) + 'px', left: (rect.left - 30) + 'px' },
      hasBackdrop: true,
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });
    this.subs.sink = dialogRef.afterClosed().subscribe(selectedDate => {
      if (selectedDate) {
        this.filters.selectedDate = selectedDate;
      }
    });
  }

  public selectCamera(event: any) {
    const element = document.elementFromPoint(event.x, event.y);
    const rect = element ? element.getBoundingClientRect(): { top: 0, left: 0 };
    const dialogRef = this.dialog.open(CameraDialogComponent, {
      position: {top: (rect.top + 27) + 'px', left: (rect.left - 30) + 'px' },
      hasBackdrop: true,
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });
    this.subs.sink = dialogRef.afterClosed().subscribe(selectedDate => {
      if (selectedDate) {
        this.filters.selectedDate = selectedDate;
      }
    });
  }
  
  public datePickerInput(event: MatDatepickerInputEvent<Date>) {
    var selectedDate = event?.value ? new Date(event.value.valueOf() + (-event.value.getTimezoneOffset() * 60 * 1000)) : new Date();
    this.filters.selectedDate = selectedDate; // Set date to UTC
  }
}
