import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroy } from 'src/app/components/UnsubscribeOnDestroy';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.scss']
})
export class TestimonyComponent extends UnsubscribeOnDestroy implements OnInit {
  public exhibit: string = '';

  constructor(private stateService: StateService) {
    super();
  }

  ngOnInit(): void {
  }

  public testify() {
    this.stateService.testify(this.exhibit);
  }
}