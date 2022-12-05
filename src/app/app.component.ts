import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router, ) {
  }
  
  ngOnInit(): void {
    this.checkExhibit();
  }

  private checkExhibit() {
    const exhibit = this.cookieService.get('exhibit');
    console.log(`Exh: ${exhibit}`);
    if (!exhibit) {
      this.router.navigate([ '/testimony' ]);
    }
  }
}
