import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  ServiceService
} from '../model/service.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent
  implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('heroVideo')
  private heroVideo?: ElementRef<HTMLVideoElement>;

  private observer?: IntersectionObserver;
  private resizeTimeoutId?: number;

  private readonly desktopMediaQuery =
    window.matchMedia('(min-width: 769px)');

  private readonly reducedMotionMediaQuery =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

  private readonly scrollHandler = (): void => {
    const nav =
      document.getElementById('bfNav');

    nav?.classList.toggle(
      'solid',
      window.scrollY > 50
    );
  };

  private readonly resizeHandler = (): void => {
    window.clearTimeout(
      this.resizeTimeoutId
    );

    this.resizeTimeoutId =
      window.setTimeout(() => {
        this.updateHeroVideoState();
      }, 200);
  };

  constructor(
    private readonly service: ServiceService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    window.addEventListener(
      'scroll',
      this.scrollHandler,
      { passive: true }
    );

    window.addEventListener(
      'resize',
      this.resizeHandler,
      { passive: true }
    );

    this.scrollHandler();
    this.initializeScrollAnimations();
    this.initializeHeroVideo();
  }

  ngOnDestroy(): void {
    window.removeEventListener(
      'scroll',
      this.scrollHandler
    );

    window.removeEventListener(
      'resize',
      this.resizeHandler
    );

    window.clearTimeout(
      this.resizeTimeoutId
    );

    this.observer?.disconnect();

    const video =
      this.heroVideo?.nativeElement;

    if (video) {
      video.pause();
      video.removeAttribute('src');

      const source =
        video.querySelector('source');

      source?.removeAttribute('src');

      video.load();
    }
  }

  private initializeScrollAnimations(): void {
    if (
      !('IntersectionObserver' in window) ||
      this.reducedMotionMediaQuery.matches
    ) {
      document
        .querySelectorAll<HTMLElement>('.sr')
        .forEach(element => {
          element.classList.add('in');
        });

      return;
    }

    this.observer =
      new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add('in');
            this.observer?.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px'
        }
      );

    document
      .querySelectorAll<HTMLElement>('.sr')
      .forEach(element => {
        this.observer?.observe(element);
      });
  }

  private initializeHeroVideo(): void {
    const startVideo = (): void => {
      window.setTimeout(() => {
        this.updateHeroVideoState();
      }, 800);
    };

    if (document.readyState === 'complete') {
      startVideo();
      return;
    }

    window.addEventListener(
      'load',
      startVideo,
      { once: true }
    );
  }

  private updateHeroVideoState(): void {
    const video =
      this.heroVideo?.nativeElement;

    if (!video) {
      return;
    }

    const shouldPlay =
      this.desktopMediaQuery.matches &&
      !this.reducedMotionMediaQuery.matches;

    if (!shouldPlay) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    const source =
      video.querySelector<HTMLSourceElement>(
        'source[data-src]'
      );

    if (source && !source.src) {
      source.src =
        source.dataset['src'] ?? '';

      video.load();
    }

    void video.play().catch(() => {
      video.pause();
    });
  }
}