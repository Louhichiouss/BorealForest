import { AfterViewInit, Component } from '@angular/core';

type SurgeryTab = 'wound' | 'inflam' | 'vessel';

@Component({
  selector: 'app-chirurgi',
  templateUrl: './chirurgi.component.html',
  styleUrls: ['./chirurgi.component.css']
})
export class ChirurgiComponent implements AfterViewInit {
  activeTab: SurgeryTab = 'wound';

  setTab(tab: SurgeryTab): void {
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
