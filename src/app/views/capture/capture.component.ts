import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { UnsubscribeOnDestroy } from 'src/app/components/UnsubscribeOnDestroy';
import { Camera } from 'src/app/models/camera';
import { CoCaService } from 'src/app/services/coca.service';
import { DateDialogComponent } from '../date-dialog/date-dialog.component';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent extends UnsubscribeOnDestroy implements OnInit {
  @ViewChild('dateButton', { static: false }) public dateButtonRef: ElementRef | undefined;

  public filters = {
    selectedDate: new Date(new Date().valueOf() + (-(new Date()).getTimezoneOffset() * 60 * 1000)),
    selectedHour: -1,
    selectedCamera: 'All',
    onlyLatest: true
  };
  public cameras: Camera[] = [];

  constructor(public cocaService: CoCaService, public dialog: MatDialog) {
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

  public selectDate() {
    const element = this.dateButtonRef?.nativeElement;
    const rect = element?element.getBoundingClientRect(): { top: 0, left: 0 }
    const dialogRef = this.dialog.open(DateDialogComponent, {
      position: {top:(rect.top+55)+'px',left:(rect.left+25)+'px'},
      hasBackdrop: false,
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
