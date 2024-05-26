import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('navbarCollapse', { static: false }) navbarCollapse!: ElementRef;

  title = 'pets';
  constructor(private viewPort: ViewportScroller, private router: Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        // this.closeNavbar()
      }
    });
  }

  closeNavbar() {
    if (this.navbarCollapse) {
      const navbar = this.navbarCollapse.nativeElement;
      if (navbar.classList.contains('show')) {
        navbar.classList.remove('show');
      }
    }
  }
}
