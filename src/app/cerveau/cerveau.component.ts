import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-cerveau',
  templateUrl: './cerveau.component.html',
  styleUrls: ['./cerveau.component.css']
})
export class CerveauComponent implements OnInit {

  ngOnInit(): void {
    this.revealElements();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.revealElements();
  }

  private revealElements(): void {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach((el: Element) => {
      const windowHeight = window.innerHeight;
      const top = el.getBoundingClientRect().top;

      if (top < windowHeight - 120) {
        el.classList.add('active');
      }
    });
  }
}
