import { AfterViewInit, Component } from '@angular/core';

type AutVisual = 'neuro' | 'cells' | 'synapse';

@Component({
  selector: 'app-autistes',
  templateUrl: './autistes.component.html',
  styleUrls: ['./autistes.component.css']
})
export class AutistesComponent implements AfterViewInit {

  activeVisual: AutVisual = 'neuro';

  setVisual(visual: AutVisual): void {
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
