import { AfterViewInit, Component, OnDestroy } from '@angular/core';

type PainTab = 'normal' | 'obstruct' | 'hbot' | 'new';

@Component({
  selector: 'app-la-gestion-de-la-douleur',
  templateUrl: './la-gestion-de-la-douleur.component.html',
  styleUrls: ['./la-gestion-de-la-douleur.component.css']
})
export class LaGestionDeLaDouleurComponent implements AfterViewInit, OnDestroy {
  activeTab: PainTab = 'normal';
  private observer?: IntersectionObserver;

  setTab(tab: PainTab): void {
    this.activeTab = tab;
  }

  ngAfterViewInit(): void {
    const elements = document.querySelectorAll('.fade-up, .slide-l, .slide-r');

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis');
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach(el => this.observer?.observe(el));

    setTimeout(() => {
      document.querySelectorAll('.reveal-first').forEach(el => {
        el.classList.add('vis');
      });
    }, 200);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
