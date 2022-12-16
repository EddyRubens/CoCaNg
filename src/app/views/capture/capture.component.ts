import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UnsubscribeOnDestroy } from 'src/app/components/UnsubscribeOnDestroy';
import { Capture } from 'src/app/models/capture';
import { CoCaService } from 'src/app/services/coca.service';
import { StateService } from 'src/app/services/state.service';
import { CaptureInfoDialogComponent } from '../capture-info-dialog/capture-info-dialog';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent extends UnsubscribeOnDestroy implements OnInit {
  public selectedDate: Date = new Date();

  constructor(public cocaService: CoCaService, public dialog: MatDialog, public stateService: StateService) {
    super(); // Needed for UnsubscribeOnDestroy
  }

  ngOnInit(): void {
    this.stateService.loadCameras();
  }

  public onSelectedDateChanged() {
    this.stateService.reloadNeeded = true;
  }

  public onHourChanged(hourId: number) {
    this.stateService.reloadNeeded = true;
    this.stateService.selectHour(hourId)
  }

  public onCameraChanged(cameraId: string) {
    this.stateService.reloadNeeded = true;
    this.stateService.selectCamera(cameraId);
  }

  public onOnlyLatestChanged() {
    this.stateService.reloadNeeded = true;
    this.stateService.filters.onlyLatest = !this.stateService.filters.onlyLatest
  }

  public getSelectedCameraNumber(): string {
    var returnValue = '';

    if (this.stateService.selectedCamera) {
      if (/^[0-9][0-9]-/.test(this.stateService.selectedCamera.name)) {
        returnValue = this.stateService.selectedCamera.name.slice(0, 2);
      }
    }
    
    return returnValue;
  }

  public getSelectedCameraTitle(): string {
    var returnValue = 'All';

    if (this.stateService.selectedCamera) {
      if (/^[0-9][0-9]-/.test(this.stateService.selectedCamera.name)) {
        returnValue = this.stateService.selectedCamera.name.slice(3);
      } else {
        returnValue = this.stateService.selectedCamera.name;
      }
    }

    return returnValue;
  }

  public getWidth(): string {
    return this.isMobile() ? '100%' : '50%';
  }

  public getTransform(capture: Capture) {
    console.log(`Rotation: ${capture.camera.rotation}`);
    return `rotate(${capture.camera.rotation}deg)`;
  }

  public isMobile(): boolean {
    return (window.screen.width < 1000);
  }

  public openCaptureInfoDialog(capture: any, captureId: string, event: MouseEvent): void {
    const filters = this.stateService.filters;
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
