import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Camera } from '../models/camera';
import { HostInfo } from '../models/host-info';

@Injectable({
  providedIn: 'root'
})
export class CoCaService {
  private urlPrefix = 'http://cocafa.azurewebsites.net:7003/api';
  private options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
   };
   public busy = false;

  constructor(private http: HttpClient) { }

  public setHash(hash: string) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Exhibit': hash
      })
    };
  }

  public getHostInfo(hash: string): Observable<HostInfo> {
    this.reportRequest(true, this.getHostInfo);
    this.setHash(hash);
    return this.http.get<HostInfo>(`${this.urlPrefix}/HostInfo`, this.options)
      .pipe(map(response => {
        this.reportRequest(false, this.getHostInfo);
        return response;
      }));
  }

  public getCameras(): Observable<Camera[]> {
    this.reportRequest(true, this.getCameras);
    return this.http.get<Camera[]>(`${this.urlPrefix}/Cameras`, this.options)
      .pipe(map(response => {
        this.reportRequest(false, this.getCameras);
        return response;
      }));
  }

  public getCamera(id: string): Observable<Camera> {
    this.reportRequest(true, this.getCamera);
    return this.http.get<Camera>(`${this.urlPrefix}/Cameras/${id}`)
      .pipe(map(response => {
        this.reportRequest(false, this.getCamera);
        return response;
      }));
  }

  public getCaptures(filters: any) {
    let formattedDate: string;

    if (!filters.selectedDate) {
      formattedDate = new Date().toISOString().slice(0, 10);
    } else {
      formattedDate = filters.selectedDate.toISOString().slice(0, 10);
    }
    if (!filters.selectedHour) {
      filters.selectedHour = -1;
    }
    if (!filters.selectedLocation) {
      filters.selectedLocation = 'All';
    }

    const url = `${this.urlPrefix}/Captures?date=${formattedDate}&hour=${filters.selectedHour}&location=${filters.selectedLocation}&onlyLatest=${filters.onlyLatest}`;
    this.busy = true;
    return this.http.get(url)
      .pipe(map(response => {
        this.busy = false;
        return response;
      }));
  }

  public deleteCaptures(date: Date) {
    // let formattedDate: string;

    // if (date) {
    //   formattedDate = date.toISOString().slice(0, 10);
    //   const url = `${this.urlPrefix}/Captures?date=${formattedDate}`;
    //   this.busy = true;
    //   return this.http.delete(url)
    //     .pipe(map(response => {
    //       this.busy = false;
    //       return response;
    //     }));
    // }
  }

  public getStatistics() {
    const url = `${this.urlPrefix}/Statistics`;
    this.busy = true;
    return this.http.get(url)
      .pipe(map(response => {
        this.busy = false;
        return response;
      }));
  }

  public getCaptureDetails(date: string, time: string, locationId: string) {
    const url = `${this.urlPrefix}/DetailedCapture?date=${date}&time=${time}&locationId=${locationId}`;
    this.busy = true;
    return this.http.get(url)
      .pipe(map(response => {
        this.busy = false;
        return response;
      }));
  }

  private reportRequest(start: boolean, requestor: Function, message?: string) {
    this.busy = start;
    if (start) {
      console.log(`${requestor.name} started ${message ? '- ' + message : ''}`);
    } else {
      console.log(`${requestor.name} ended ${message ? '- ' + message : ''}`);
    }
  }
}
