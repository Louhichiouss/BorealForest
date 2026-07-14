import { AfterViewInit, Component, OnDestroy } from '@angular/core';

type VisualTab = 'scar' | 'swelling' | 'collagen';

@Component({
  selector: 'app-esthestique',
  templateUrl: './esthestique.component.html',
  styleUrls: ['./esthestique.component.css']
})
export class EsthestiqueComponent implements AfterViewInit, OnDestroy {
  activeVisual: VisualTab = 'scar';
  private observer?: IntersectionObserver;
  private revealTimer?: ReturnType<typeof setTimeout>;

  ngAfterViewInit(): void {
    const animatedElements = document.querySelectorAll<HTMLElement>(
      'app-esthestique .fade-up, app-esthestique .slide-l, app-esthestique .slide-r'
    );

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('vis');
              this.observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 }
      );

      animatedElements.forEach(element => this.observer?.observe(element));
    } else {
      animatedElements.forEach(element => element.classList.add('vis'));
    }

    this.revealTimer = setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>('app-esthestique #introL, app-esthestique #introR, app-esthestique #visSec')
        .forEach(element => element.classList.add('vis'));
    }, 200);
  }

  setVisual(tab: VisualTab): void {
    this.activeVisual = tab;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.revealTimer) {
      clearTimeout(this.revealTimer);
    }
  }
}