import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnsubscribeOnDestroy } from 'src/app/components/UnsubscribeOnDestroy';
import { Camera } from 'src/app/models/camera';
import { KnownPages } from 'src/app/models/known-pages';
import { CoCaService } from 'src/app/services/coca.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent extends UnsubscribeOnDestroy implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns = ['name', 'id', 'rotation', 'icon', 'iconName', 'timeZone'];
  public camerasDataSource!: MatTableDataSource<Camera>;

  constructor(public cocaService: CoCaService, public stateService: StateService,
    public snackBar: MatSnackBar) {
    super(); // Needed for UnsubscribeOnDestroy
  }

  ngOnInit(): void {
    this.stateService.selectPageChanged.subscribe(selectedPage =>  {
      if (selectedPage == KnownPages.Cameras) {
        this.initializeView();
      }
    });
  }

  private initializeView() {
    this.camerasDataSource = new MatTableDataSource<Camera>(this.stateService.cameras);
    this.camerasDataSource.sort = this.sort;
  }
}
