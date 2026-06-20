import { AfterViewInit, Component, OnDestroy } from '@angular/core';

type VesselTab = 'normal' | 'blocked' | 'hbot' | 'new';

@Component({
  selector: 'app-princpe-de-base',
  templateUrl: './princpe-de-base.component.html',
  styleUrls: ['./princpe-de-base.component.css']
})
export class PrincpeDeBaseComponent implements AfterViewInit, OnDestroy {
  activeTab: VesselTab = 'normal';
  private observer?: IntersectionObserver;

  switchTab(tab: VesselTab): void {
    this.activeTab = tab;
  }

  ngAfterViewInit(): void {
    const elements = document.querySelectorAll('.reveal');

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach(el => this.observer?.observe(el));

    setTimeout(() => {
      document.querySelectorAll('.reveal-first').forEach(el => {
        el.classList.add('visible');
      });
    }, 100);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
