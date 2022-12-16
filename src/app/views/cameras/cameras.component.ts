import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnsubscribeOnDestroy } from 'src/app/components/UnsubscribeOnDestroy';
import { KnownPages } from 'src/app/models/known-pages';
import { CoCaService } from 'src/app/services/coca.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent extends UnsubscribeOnDestroy implements OnInit {
  public displayedColumns = ['id', 'name', 'rotation', 'icon', 'timeZone'];

  constructor(public cocaService: CoCaService, public stateService: StateService,
    public snackBar: MatSnackBar) {
    super(); // Needed for UnsubscribeOnDestroy
  }

  ngOnInit(): void {
    this.stateService.selectPageChanged.subscribe(selectedPage =>  {
      if (selectedPage == KnownPages.Statistics) {
        this.initializeView();
      }
    });
  }

  private initializeView() {
  }
}
