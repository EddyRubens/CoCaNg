import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from 'src/app/components/UnsubscribeOnDestroy';
import { Camera } from 'src/app/models/camera';
import { CoCaService } from 'src/app/services/coca.service';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent extends UnsubscribeOnDestroy implements OnInit {
  public cameras: Camera[] = [];
  public selectedCamera: Camera | undefined;

  constructor(public cocaService: CoCaService) {
    super(); // Needed for UnsubscribeOnDestroy
  }

  ngOnInit(): void {
    this.loadCameras();
  }


  private loadCameras()
  {
    this.subs.sink = this.cocaService.getCameras().subscribe({
      next: cameras => {
        this.cameras = cameras;
      }
    });
  }
}
