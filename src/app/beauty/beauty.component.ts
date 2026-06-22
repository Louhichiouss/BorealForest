import { AfterViewInit, Component } from '@angular/core';

type BeautyVisual = 'collagen' | 'toxin' | 'vessel';

@Component({
  selector: 'app-beauty',
  templateUrl: './beauty.component.html',
  styleUrls: ['./beauty.component.css']
})
export class BeautyComponent implements AfterViewInit {

  activeVisual: BeautyVisual = 'collagen';

  setVisual(visual: BeautyVisual): void {
    this.activeVisual = visual;
  }

  ngAfterViewInit(): void {
    const elements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.12 });

    elements.forEach((el) => observer.observe(el));
  }
}
