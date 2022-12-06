import { Component, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  template: ''
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class UnsubscribeOnDestroy implements OnDestroy {
  public subs = new SubSink(); // The subscription sink object that stores all subscriptions

  ngOnDestroy(): void {
    this.subs.unsubscribe(); // The lifecycle hook to unsubscribe all subscriptions on destroy
  }
}
