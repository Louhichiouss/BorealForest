import { AfterViewInit, Component } from '@angular/core';

type AuditiveTab = 'before' | 'hbot' | 'cells';

@Component({
  selector: 'app-perte-auditive',
  templateUrl: './perte-auditive.component.html',
  styleUrls: ['./perte-auditive.component.css']
})
export class PerteAuditiveComponent implements AfterViewInit {

  activeTab: AuditiveTab = 'before';

  setTab(tab: AuditiveTab): void {
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
    }, {
      threshold: 0.12
    });

    elements.forEach((el) => observer.observe(el));
  }

}
