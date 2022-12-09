import { Component } from '@angular/core';
import { Camera } from 'src/app/models/camera';

@Component({
  selector: 'app-camera-dialog',
  templateUrl: './camera-dialog.component.html',
  styleUrls: ['./camera-dialog.component.scss']
})
export class CameraDialogComponent {
  public selectedCamera: Camera | undefined;
}
