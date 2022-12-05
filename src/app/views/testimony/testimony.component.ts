import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.scss']
})
export class TestimonyComponent implements OnInit {
  public exhibit: string = '';

  constructor(private cookieService: CookieService, private router: Router) {
  }

  ngOnInit(): void {
  }

  public testify() {
    this.cookieService.set('exhibit', this.exhibit, { expires: new Date('2065-08-02') });
    this.router.navigateByUrl('/capture');
  }
}