import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-sommeil-energie',
  templateUrl: './sommeil-energie.component.html',
  styleUrls: ['./sommeil-energie.component.css']
})
export class SommeilEnergieComponent implements AfterViewInit, OnDestroy {
  activeView: 'cellule' | 'cerveau' | 'sommeil' = 'cellule';

  private observer?: IntersectionObserver;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const root = this.elementRef.nativeElement;

    const animatedElements = root.querySelectorAll<HTMLElement>(
      '.fade-up, .slide-l, .slide-r'
    );

    if ('IntersectionObserver' in window) {
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

      animatedElements.forEach(element => this.observer?.observe(element));
    } else {
      animatedElements.forEach(element => element.classList.add('vis'));
    }

    window.setTimeout(() => {
      ['introL', 'introR', 'visSec'].forEach(id => {
        root.querySelector<HTMLElement>('#' + id)?.classList.add('vis');
      });
    }, 200);
  }

  setView(view: 'cellule' | 'cerveau' | 'sommeil'): void {
    this.activeView = view;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
