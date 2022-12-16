import { EventEmitter, Injectable, OnDestroy, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SubSink } from 'subsink';
import { Camera } from '../models/camera';
import { Capture } from '../models/capture';
import { KnownPages } from '../models/known-pages';
import { CoCaService } from './coca.service';

@Injectable({
  providedIn: 'root'
})
export class StateService implements OnDestroy {
  @Output() selectPageChanged = new EventEmitter<KnownPages>();

  public subs = new SubSink(); // The subscription sink object that stores all subscriptions
  public knownPagesEnum = KnownPages;
  public knownPages: any[] = [];
  public selectedCapture: Capture | undefined;
  private _selectedPage = KnownPages.Capture;
  public filters = {
    selectedDate: new Date(new Date().setHours(0,0,0,0)), // Midnight
    selectedHour: -1,
    selectedCamera: 'All',
    onlyLatest: true
  };
  public selectedHour: any;
  public hours: any[] = [];
  public cameras: Camera[] = [];
  public selectedCamera: Camera | undefined;
  public captures: Capture[] = [];
  public reloadNeeded = true;

  public set selectedPage(value: KnownPages) {
    console.log(`Selected page: ${value}`);
    this._selectedPage = value;
    this.selectPageChanged.emit(this.selectedPage);
  }

  public get selectedPage(): KnownPages {
    return this._selectedPage;
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

  public loadCameras() {
    this.subs.sink = this.cocaService.getCameras().subscribe({
      next: cameras => {
        this.cameras = cameras;
      }
    });
  }

  public selectHour(hour: number) {
    this.selectedHour = this.hours.find(h => h.id == hour);
    this.filters.selectedHour = hour;
  }

  public selectCamera(cameraId: string) {
    this.selectedCamera = this.cameras.find(c => c.id == cameraId);
    console.log(`Selected camera: ${cameraId} => ${this.selectedCamera}`);
    console.log(this.cameras);
  }

  constructor(private cookieService: CookieService, private cocaService: CoCaService) {
    this.buildHours(24);
    for (var knownPage in KnownPages) { // Build object array from enum, see https://www.angularjswiki.com/angular/names-of-enums-typescript/
      if (!isNaN(Number(knownPage))) {
        this.knownPages.push({ id: knownPage, name: KnownPages[knownPage]});
      }    
    }
  }

  public getToolbarMenuItems(): any[] {
    return this.knownPages.filter(p => p.name != 'DetailedCapture');
  }
  
  public testify(exhibit: string) {
    var shajs = require('sha.js');
    var exhibitHash = new shajs.sha256().update(exhibit).digest('hex');
    this.subs.sink = this.cocaService.getHostInfoAndSetHash(exhibitHash).subscribe({
      next: hostInfo => {
        this.cookieService.set('exhibit', exhibitHash, { expires: new Date('2065-08-02') });
      },
      error: (error) => {
        this.cookieService.delete('exhibit');
      }
    });
  }

  public get exhibitAccepted() {
    const exhibit = this.cookieService.get('exhibit');
    if (!!exhibit) {
      this.cocaService.setHash(exhibit);
    }

    return !!exhibit;
  }

  public searchCaptures() {
    if (!this.selectedCamera) {
      this.filters.selectedCamera = 'All';
    } else {
      this.filters.selectedCamera = this.selectedCamera.id;
    }
    this.subs.sink = this.cocaService.getCaptures(this.filters).subscribe({
      next: captures => {
        this.reloadNeeded = false;
        this.captures = captures;
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe(); // The lifecycle hook to unsubscribe all subscriptions on destroy
  }
}
