import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';

type CognitiveView = 'fog' | 'hbot' | 'synapse';

@Component({
  selector: 'app-les-capacite-cognitives',
  templateUrl: './les-capacite-cognitives.component.html',
  styleUrls: ['./les-capacite-cognitives.component.css']
})
export class LesCapaciteCognitivesComponent implements AfterViewInit, OnDestroy {
  activeView: CognitiveView = 'fog';
  private observer?: IntersectionObserver;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const elements = this.elementRef.nativeElement.querySelectorAll('.fade-in, .slide-left, .slide-right');

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('vis'));
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
      { threshold: 0.15 }
    );

    elements.forEach((el) => this.observer?.observe(el));
  }

  switchView(view: CognitiveView): void {
    this.activeView = view;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
