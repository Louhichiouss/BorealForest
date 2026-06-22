import { AfterViewInit, Component } from '@angular/core';

type CovidVisual = 'cytokine' | 'o2' | 'organ';

@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.css']
})
export class Covid19Component implements AfterViewInit {

  activeVisual: CovidVisual = 'cytokine';

  setVisual(visual: CovidVisual): void {
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
    }, {
      threshold: 0.12
    });

    elements.forEach((el) => observer.observe(el));
  }

}
