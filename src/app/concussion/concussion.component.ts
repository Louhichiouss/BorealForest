import { AfterViewInit, Component } from '@angular/core';

type ConcussionTab = 'impact' | 'hbot' | 'regen';

@Component({
  selector: 'app-concussion',
  templateUrl: './concussion.component.html',
  styleUrls: ['./concussion.component.css']
})
export class ConcussionComponent implements AfterViewInit {

  activeTab: ConcussionTab = 'impact';

  setTab(tab: ConcussionTab): void {
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
