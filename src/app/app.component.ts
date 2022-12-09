import { Component, OnInit } from '@angular/core';
import { KnownPages } from './models/known-pages';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public stateService: StateService) {
  }
  
  ngOnInit(): void {
  }

  public checkExhibit() {
    return this.stateService.exhibitAccepted;
  }
}
