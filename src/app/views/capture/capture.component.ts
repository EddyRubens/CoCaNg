import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UnsubscribeOnDestroy } from 'src/app/components/UnsubscribeOnDestroy';
import { Camera } from 'src/app/models/camera';
import { Capture } from 'src/app/models/capture';
import { CoCaService } from 'src/app/services/coca.service';
import { StateService } from 'src/app/services/state.service';
import { CaptureInfoDialogComponent } from '../capture-info-dialog/capture-info-dialog';
import { DateDialogComponent } from '../date-dialog/date-dialog.component';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent extends UnsubscribeOnDestroy implements OnInit {
  public filters = {
    selectedDate: new Date(new Date().setHours(0,0,0,0)), // Midnight
    selectedHour: -1,
    selectedCamera: 'All',
    onlyLatest: true
  };
  public cameras: Camera[] = [];
  public hours: any[] = [];
  public selectedHour: any;
  public selectedCamera: Camera | undefined;
  public captures: Capture[] = [];
  private reloadNeeded = true;

  constructor(public cocaService: CoCaService, public dialog: MatDialog, public stateService: StateService) {
    super(); // Needed for UnsubscribeOnDestroy
  }

  ngOnInit(): void {
    this.loadCameras();
    this.buildHours(24);
  }

  private loadCameras() {
    this.subs.sink = this.cocaService.getCameras().subscribe({
      next: cameras => {
        this.cameras = cameras;
      }
    });
  }

  private buildHours(length: number) {
    this.hours = new Array(length + 1);

    this.hours[0] = {
      id: -1,
      name: '00-24'
    };
    for (let i = 0; i < length; i++) {
      this.hours[i + 1] = {
        id: i,
        name: String(i).padStart(2, '0')
      };
    }

    this.selectedHour = this.hours[0];
  }

  public selectDate(event: any) {
    const element = document.elementFromPoint(event.x, event.y);
    const rect = element ? element.getBoundingClientRect(): { top: 0, left: 0 };
    const selectedDate = this.filters.selectedDate;
    const dialogRef = this.dialog.open(DateDialogComponent, {
      position: {top: (rect.top + 27) + 'px', left: (rect.left - 30) + 'px' },
      hasBackdrop: true,
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { selectedDate }
    });
    this.subs.sink = dialogRef.afterClosed().subscribe(selectedDate => {
      if (selectedDate) {
        this.filters.selectedDate = selectedDate;
        console.log(`Selected date: ${this.filters.selectedDate}`);
        this.reloadNeeded = true;
      }
    });
  }

  public selectHour(hour: any) {
    this.selectedHour = hour;
    this.filters.selectedHour = hour.id;
  }

  public getSelectedCameraNumber(): string {
    var returnValue = '';

    if (this.selectedCamera) {
      if (/^[0-9][0-9]-/.test(this.selectedCamera.name)) {
        returnValue = this.selectedCamera.name.slice(0, 2);
      }
    }
    
    return returnValue;
  }

  public getSelectedCameraTitle(): string {
    var returnValue = 'All';

    if (this.selectedCamera) {
      if (/^[0-9][0-9]-/.test(this.selectedCamera.name)) {
        returnValue = this.selectedCamera.name.slice(3);
      } else {
        returnValue = this.selectedCamera.name;
      }
    }

    return returnValue;
  }

  public searchCaptures() {
    if (!this.selectedCamera) {
      this.filters.selectedCamera = 'All';
    } else {
      this.filters.selectedCamera = this.selectedCamera.id;
    }
    this.subs.sink = this.cocaService.getCaptures(this.filters).subscribe({
      next: captures => {
        this.captures = captures;
      }
    });
  }

  public getWidth(): string {
    return this.isMobile() ? '100%' : '50%';
  }

  public getTransform(capture: Capture) {
    return `rotate(${capture.camera.rotation}deg)`;
  }

  public isMobile(): boolean {
    return (window.screen.width < 1000);
  }

  public openCaptureInfoDialog(capture: any, captureId: string, event: MouseEvent): void {
    const filters = this.filters;
    const element = document.elementFromPoint(event.x, event.y);
    if (element) {
      element.scrollIntoView();
    }
    const rect = element ? element.getBoundingClientRect(): { top: 0, left: 0 };
    if (event) {
      this.dialog.open(CaptureInfoDialogComponent, {
        width: '350px',
        position: {top: (rect.top + 10) + 'px', left: (rect.left + 10) + 'px' },
        data: { filters, captureId, capture }
      });
    } else {
      this.dialog.open(CaptureInfoDialogComponent, {
        width: '350px',
        data: { filters, capture }
      });
    }
  }
}
