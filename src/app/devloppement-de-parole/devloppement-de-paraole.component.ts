import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';

type VisualTab = 'voix' | 'broca' | 'mots';

@Component({
  selector: 'app-devloppement-de-paraole',
  templateUrl: './devloppement-de-paraole.component.html',
  styleUrls: ['./devloppement-de-paraole.component.css']
})
export class DevloppementDeParaoleComponent implements AfterViewInit, OnDestroy {
  activeVisual: VisualTab = 'voix';

  private observer?: IntersectionObserver;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.initRevealAnimation();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  setVisual(tab: VisualTab): void {
    this.activeVisual = tab;
  }

  private initRevealAnimation(): void {
    const host = this.elementRef.nativeElement;
    const elements = host.querySelectorAll<HTMLElement>('.reveal, .slide-l, .slide-r');

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('vis'));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => this.observer?.observe(element));

    setTimeout(() => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight) {
          element.classList.add('vis');
        }
      });
    }, 150);
  }
}
