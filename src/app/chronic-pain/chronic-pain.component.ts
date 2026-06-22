import { AfterViewInit, Component } from '@angular/core';

type ChronicPainTab = 'inflam' | 'cells' | 'nerve';

@Component({
  selector: 'app-chronic-pain',
  templateUrl: './chronic-pain.component.html',
  styleUrls: ['./chronic-pain.component.css']
})
export class ChronicPainComponent implements AfterViewInit {

  activeTab: ChronicPainTab = 'inflam';

  setTab(tab: ChronicPainTab): void {
    this.activeTab = tab;
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
