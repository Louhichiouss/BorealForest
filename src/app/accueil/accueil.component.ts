import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent
  implements AfterViewInit, OnDestroy {

  @ViewChild('heroVideo')
  private heroVideo?: ElementRef<HTMLVideoElement>;

  private observer?: IntersectionObserver;
  private resizeTimeoutId?: number;
  private heroStartTimeoutId?: number;
  private loadListenerRegistered = false;
  private heroVideoLoaded = false;

  private readonly isBrowser: boolean;

  private desktopMediaQuery?: MediaQueryList;
  private reducedMotionMediaQuery?: MediaQueryList;

  constructor(
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.desktopMediaQuery =
        window.matchMedia('(min-width: 769px)');

      this.reducedMotionMediaQuery =
        window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        );
    }
  }

  private readonly scrollHandler = (): void => {
    if (!this.isBrowser) {
      return;
    }

    const nav = document.getElementById('bfNav');

    nav?.classList.toggle(
      'solid',
      window.scrollY > 50
    );
  };

  private readonly resizeHandler = (): void => {
    if (!this.isBrowser) {
      return;
    }

    window.clearTimeout(this.resizeTimeoutId);

    this.resizeTimeoutId = window.setTimeout(() => {
      this.updateHeroVideoState();
    }, 200);
  };

  private readonly loadHandler = (): void => {
    if (!this.isBrowser) {
      return;
    }

    this.loadListenerRegistered = false;

    window.clearTimeout(this.heroStartTimeoutId);

    this.heroStartTimeoutId = window.setTimeout(() => {
      this.updateHeroVideoState();
    }, 500);
  };

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

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
    if (!this.isBrowser) {
      return;
    }

    window.removeEventListener(
      'scroll',
      this.scrollHandler
    );

    window.removeEventListener(
      'resize',
      this.resizeHandler
    );

    if (this.loadListenerRegistered) {
      window.removeEventListener(
        'load',
        this.loadHandler
      );
    }

    window.clearTimeout(this.resizeTimeoutId);
    window.clearTimeout(this.heroStartTimeoutId);

    this.observer?.disconnect();
    this.destroyHeroVideo();
  }

  private initializeScrollAnimations(): void {
    if (!this.isBrowser) {
      return;
    }

    const animatedElements =
      document.querySelectorAll<HTMLElement>('.sr');

    const reducedMotion =
      this.reducedMotionMediaQuery?.matches ?? false;

    if (
      !('IntersectionObserver' in window) ||
      reducedMotion
    ) {
      animatedElements.forEach(element => {
        element.classList.add('in');
      });

      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('in');
          this.observer?.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    animatedElements.forEach(element => {
      this.observer?.observe(element);
    });
  }

  private initializeHeroVideo(): void {
    if (!this.isBrowser) {
      return;
    }

    if (document.readyState === 'complete') {
      this.loadHandler();
      return;
    }

    this.loadListenerRegistered = true;

    window.addEventListener(
      'load',
      this.loadHandler,
      { once: true }
    );
  }

  private updateHeroVideoState(): void {
    if (!this.isBrowser) {
      return;
    }

    const video = this.heroVideo?.nativeElement;

    if (!video) {
      return;
    }

    const shouldPlay =
      (this.desktopMediaQuery?.matches ?? false) &&
      !(this.reducedMotionMediaQuery?.matches ?? false);

    if (!shouldPlay) {
      this.unloadHeroVideo();
      return;
    }

    this.loadAndPlayHeroVideo(video);
  }

  private loadAndPlayHeroVideo(
    video: HTMLVideoElement
  ): void {
    if (!this.isBrowser) {
      return;
    }

    const source =
      video.querySelector<HTMLSourceElement>('source');

    if (!source) {
      return;
    }

    if (!this.heroVideoLoaded) {
      const sourceUrl = source.dataset['src'];

      if (!sourceUrl) {
        return;
      }

      source.setAttribute('src', sourceUrl);
      video.load();

      this.heroVideoLoaded = true;
    }

    if (
      video.readyState >=
      HTMLMediaElement.HAVE_FUTURE_DATA
    ) {
      this.playVideo(video);
      return;
    }

    video.addEventListener(
      'canplay',
      () => {
        this.playVideo(video);
      },
      { once: true }
    );
  }

  private playVideo(
    video: HTMLVideoElement
  ): void {
    if (
      !this.isBrowser ||
      typeof video.play !== 'function'
    ) {
      return;
    }

    void video.play().catch(() => {
      video.muted = true;

      void video.play().catch(() => {
        // Le poster reste visible si autoplay est bloqué.
      });
    });
  }

  private unloadHeroVideo(): void {
    if (!this.isBrowser) {
      return;
    }

    const video = this.heroVideo?.nativeElement;

    if (!video) {
      return;
    }

    if (typeof video.pause === 'function') {
      video.pause();
    }

    try {
      video.currentTime = 0;
    } catch {
      // La vidéo n'est pas encore chargée.
    }

    if (!this.heroVideoLoaded) {
      return;
    }

    const source =
      video.querySelector<HTMLSourceElement>('source');

    source?.removeAttribute('src');

    if (typeof video.load === 'function') {
      video.load();
    }

    this.heroVideoLoaded = false;
  }

  private destroyHeroVideo(): void {
    if (!this.isBrowser) {
      return;
    }

    const video = this.heroVideo?.nativeElement;

    if (!video) {
      return;
    }

    if (typeof video.pause === 'function') {
      video.pause();
    }

    const source =
      video.querySelector<HTMLSourceElement>('source');

    source?.removeAttribute('src');

    if (typeof video.load === 'function') {
      video.load();
    }

    this.heroVideoLoaded = false;
  }
}