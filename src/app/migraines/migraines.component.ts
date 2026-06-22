import { AfterViewInit, Component } from '@angular/core';

type MigraineVisual = 'vaso' | 'inflam' | 'flow';

@Component({
  selector: 'app-migraines',
  templateUrl: './migraines.component.html',
  styleUrls: ['./migraines.component.css']
})
export class MigrainesComponent implements AfterViewInit {

  activeVisual: MigraineVisual = 'vaso';

  setVisual(visual: MigraineVisual): void {
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
