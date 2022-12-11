import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-capture-info-dialog',
  templateUrl: './capture-info-dialog.html',
  styleUrls: ['./capture-info-dialog.scss']
})
export class CaptureInfoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CaptureInfoDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log(event.url);
        if (event.url.startsWith('/capture-details')) {
          this.dialogRef.close();
        }
      }
    });
  }

  public openFullscreen(elementId: string) {
    const element = document.getElementById(elementId);

    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
