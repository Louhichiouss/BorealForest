import { AfterViewInit, Component } from '@angular/core';

type FertiliteTab = 'female' | 'male';
type FertiliteVisual = 'egg' | 'sperm' | 'vessel';

@Component({
  selector: 'app-fertilite',
  templateUrl: './fertilite.component.html',
  styleUrls: ['./fertilite.component.css']
})
export class FertiliteComponent implements AfterViewInit {

  activeTab: FertiliteTab = 'female';
  activeVisual: FertiliteVisual = 'egg';

  setTab(tab: FertiliteTab): void {
    this.activeTab = tab;
  }

  setVisual(visual: FertiliteVisual): void {
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
