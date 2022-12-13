import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Camera } from '../models/camera';
import { HostInfo } from '../models/host-info';
import { Capture } from '../models/capture';
import { DetailedCapture } from '../models/detailed-capture';

@Injectable({
  providedIn: 'root'
})
export class CoCaService {
  private urlPrefix = 'https://cocafa.azurewebsites.net/api2';
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

  public getHostInfoAndSetHash(hash: string): Observable<HostInfo> {
    this.setHash(hash);
    return this.getHostInfo()
;  }

  public getHostInfo(): Observable<HostInfo> {
    this.reportRequest(true, this.getHostInfo);
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
    return this.http.get<Camera>(`${this.urlPrefix}/Cameras/${id}`, this.options)
      .pipe(map(response => {
        this.reportRequest(false, this.getCamera);
        return response;
      }));
  }

  public getCaptures(filters: any): Observable<Capture[]> {
    let formattedDate: string;

    this.reportRequest(true, this.getCaptures);
    if (!filters.selectedDate) {
      formattedDate = new Date().toISOString().slice(0, 10);
    } else {
      formattedDate = filters.selectedDate.toISOString().slice(0, 10);
    }
    if (!filters.selectedHour) {
      filters.selectedHour = -1;
    }
    if (!filters.selectedCamera) {
      filters.selectedCamera = 'All';
    }
    const url = `${this.urlPrefix}/Captures?date=${formattedDate}&hour=${filters.selectedHour}&camera=${filters.selectedCamera}&onlyLatest=${filters.onlyLatest}`;

    return this.http.get<Capture[]>(url, this.options)
      .pipe(map(response => {
        this.reportRequest(false, this.getCaptures);
        return response;
      }));
  }

  public deleteCaptures(date: Date) {
    let formattedDate: string;

    formattedDate = date.toISOString().slice(0, 10);
    const url = `${this.urlPrefix}/Captures?date=${formattedDate}`;
    this.reportRequest(true, this.deleteCaptures);
    return this.http.delete(url, this.options)
      .pipe(map(response => {
        this.reportRequest(false, this.deleteCaptures);
        return response;
      }));
  }

  public getStatistics() {
    this.reportRequest(true, this.getStatistics);
    const url = `${this.urlPrefix}/Statistics`;
    return this.http.get(url, this.options)
      .pipe(map(response => {
        this.reportRequest(false, this.getStatistics);
        return response;
      }));
  }

  public getDetailedCapture(date: string, time: string, id: string): Observable<DetailedCapture> {
    this.reportRequest(true, this.getDetailedCapture, id);
    const url = `${this.urlPrefix}/DetailedCaptures?date=${date}&time=${time}&locationId=${id}`;
    return this.http.get<DetailedCapture>(url, this.options)
      .pipe(map(response => {
        this.reportRequest(false, this.getDetailedCapture);
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
