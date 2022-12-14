import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnsubscribeOnDestroy } from 'src/app/components/UnsubscribeOnDestroy';
import { Camera } from 'src/app/models/camera';
import { HostInfo } from 'src/app/models/host-info';
import { KnownPages } from 'src/app/models/known-pages';
import { CoCaService } from 'src/app/services/coca.service';
import { StateService } from 'src/app/services/state.service';
import { MessageSnackbarComponent } from '../message-snackbar/message-snackbar.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent extends UnsubscribeOnDestroy implements OnInit {
  @ViewChild('dateButton', { static: false }) public dateButtonRef: ElementRef | undefined;
  public appName: string = '';
  public appVersion: string = '';
  public appDate: Date = new Date();
  public hostInfo: HostInfo | undefined;
  public filters = {
    selectedDate: new Date(new Date().valueOf() + (-(new Date()).getTimezoneOffset() * 60 * 1000)),
    selectedHour: -1,
    selectedCamera: 'All',
    onlyLatest: true
  };
  public cameras: Camera[] = [];
  public statistics: any = {};
  public selectedDate: Date = new Date("2023-01-01");

  constructor(public cocaService: CoCaService, public stateService: StateService, public dialog: MatDialog,
    public snackBar: MatSnackBar) {
    super(); // Needed for UnsubscribeOnDestroy
  }

  ngOnInit(): void {
    const { name: appName } = require('../../../../package.json');
    const { version: appVersion } = require('../../../../package.json');
    const { date: appDate } = require('../../../../package.json');
    this.appName = appName;
    this.appDate = new Date(appDate);
    this.appVersion = appVersion;
    this.stateService.selectPageChanged.subscribe(selectedPage =>  {
      if (selectedPage == KnownPages.Statistics) {
        this.initializeView();
      }
    });
  }

  private initializeView() {
    this.loadHostInfo();
    this.loadStatistcs();
  }

  private loadStatistcs() {
    this.subs.sink = this.cocaService.getStatistics().subscribe({
      next: statistics => {
        this.statistics = statistics;
      }
    });
  }

  private loadHostInfo()
  {
    this.subs.sink = this.cocaService.getHostInfo().subscribe({
      next: hostInfo => {
        this.hostInfo = hostInfo;
      }
    });
  }

  public datePickerInput(event: MatDatepickerInputEvent<Date>) {
    if (event?.value) {
      this.selectedDate = new Date(new Date(event.value).setHours(0,0,0,0));
      console.log(this.selectedDate);
    }
  }

  public deleteClick() {
    if (this.selectedDate) {
      if (confirm(`Are you sure you want to delete captures of ${this.selectedDate}?`)) {
        this.cocaService.deleteCaptures(this.selectedDate).subscribe({
          next: data => {
            MessageSnackbarComponent.showMessage(this.snackBar, `Delete done (${data})`, 3000);
            this.loadStatistcs(); // Refresh
          },
          error: error => {
            MessageSnackbarComponent.showMessage(this.snackBar, error.message, 3000);
          }
        });
      }
    }
  }
}
