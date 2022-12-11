import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UnsubscribeOnDestroy } from 'src/app/components/UnsubscribeOnDestroy';
import { DetailedCapture } from 'src/app/models/detailed-capture';
import { KnownPages } from 'src/app/models/known-pages';
import { CoCaService } from 'src/app/services/coca.service';
import { StateService } from 'src/app/services/state.service';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';

@Component({
  selector: 'app-detailed-capture',
  templateUrl: './detailed-capture.component.html',
  styleUrls: ['./detailed-capture.component.scss']
})
export class DetailedCaptureComponent extends UnsubscribeOnDestroy implements OnInit {
  public detailedCapture: DetailedCapture | undefined;

  constructor(public cocaService: CoCaService, private stateService: StateService,
    public snackBar: MatSnackBar) {
    super();
  }

  ngOnInit(): void {
    if (this.stateService.selectedCapture) {
      this.loadDetailedCapture(this.stateService.selectedCapture.date, this.stateService.selectedCapture.time,
        this.stateService.selectedCapture.camera.id);
    } else {
      MessageSnackbarComponent.showMessage(this.snackBar, "No capture was selected", 3000);
    }
  }

  private loadDetailedCapture(date: string, time: string, id: string) {
    this.subs.sink = this.cocaService.getDetailedCapture(date, time, id).subscribe({
      next: detailedCapture => {
        this.detailedCapture = detailedCapture;
      }
    });
  }

  public getTransform() {
    if (this.detailedCapture?.camera) {
      return `rotate(${this.detailedCapture.camera.rotation}deg)`;
    }
    else {
      return 'rotate(0deg)';
    }
  }

  public goBack()
  {
    //TODO: check if there is a way to keep the state (selected images) on the Capture page
    this.stateService.selectedPage = KnownPages.Capture; // Display Capture view
  }
}
