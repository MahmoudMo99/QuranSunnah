import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css'],
})
export class ScrollToTopComponent implements OnInit {
  showButton = false;

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.scrollY >= 1200;
  }

  scrollToTop() {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  }
}
