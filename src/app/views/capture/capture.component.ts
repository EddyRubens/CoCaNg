import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UnsubscribeOnDestroy } from 'src/app/components/UnsubscribeOnDestroy';
import { Camera } from 'src/app/models/camera';
import { CoCaService } from 'src/app/services/coca.service';

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

  constructor(public cocaService: CoCaService) {
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

  public datePickerInput(event: MatDatepickerInputEvent<Date>) {
    var selectedDate = event?.value ? new Date(event.value.valueOf() + (-event.value.getTimezoneOffset() * 60 * 1000)) : new Date();
    this.filters.selectedDate = selectedDate; // Set date to UTC
  }

}
