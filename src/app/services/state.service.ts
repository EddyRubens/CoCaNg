import { Injectable, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SubSink } from 'subsink';
import { Capture } from '../models/capture';
import { KnownPages } from '../models/known-pages';
import { CoCaService } from './coca.service';

@Injectable({
  providedIn: 'root'
})
export class StateService implements OnDestroy {
  public subs = new SubSink(); // The subscription sink object that stores all subscriptions
  public selectedPage = KnownPages.Capture;
  public knownPagesEnum = KnownPages;
  public knownPages: any[] = [];
  public selectedCapture: Capture | undefined;

  constructor(private cookieService: CookieService, private cocaService: CoCaService) {
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

  ngOnDestroy(): void {
    this.subs.unsubscribe(); // The lifecycle hook to unsubscribe all subscriptions on destroy
  }
}
