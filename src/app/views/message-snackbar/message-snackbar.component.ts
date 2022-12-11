import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-snackbar',
  templateUrl: './message-snackbar.component.html',
  styleUrls: ['./message-snackbar.component.scss']
})
export class MessageSnackbarComponent implements OnInit {
  public static showMessage(snackBar: MatSnackBar, message: string, duration: number) {
    snackBar.openFromComponent(MessageSnackbarComponent,
      {
        data:
        {
          message
        },
        panelClass: ['snack-bar-color'],
        duration
      });
  }

  public static dismiss(snackBar: MatSnackBar) {
    snackBar.dismiss();
  }

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit() {
  }
}
