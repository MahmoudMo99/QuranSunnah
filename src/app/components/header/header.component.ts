import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor() {}

  closeNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const toggleButton = document.querySelector(
        '.navbar-toggler'
      ) as HTMLElement;
      toggleButton.click();
    }
  }

  onLinkClick() {
    this.closeNavbar();
  }
}
