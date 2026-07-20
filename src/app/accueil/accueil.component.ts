import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

import { ServiceService } from '../model/service.service';

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
  private heroStartTimeoutId?: number;
  private loadListenerRegistered = false;
  private heroVideoLoaded = false;

  private readonly desktopMediaQuery =
    window.matchMedia('(min-width: 769px)');

  private readonly reducedMotionMediaQuery =
    window.matchMedia('(prefers-reduced-motion: reduce)');

  private readonly scrollHandler = (): void => {
    const nav = document.getElementById('bfNav');

    nav?.classList.toggle(
      'solid',
      window.scrollY > 50
    );
  };

  private readonly resizeHandler = (): void => {
    window.clearTimeout(this.resizeTimeoutId);

    this.resizeTimeoutId = window.setTimeout(() => {
      this.updateHeroVideoState();
    }, 200);
  };

  private readonly loadHandler = (): void => {
    this.loadListenerRegistered = false;

    window.clearTimeout(this.heroStartTimeoutId);

    this.heroStartTimeoutId = window.setTimeout(() => {
      this.updateHeroVideoState();
    }, 1200);
  };

  constructor(
    private readonly service: ServiceService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // Garde cette méthode si elle sera utilisée plus tard.
    void this.service;
    void this.router;
  }

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
    const animatedElements =
      document.querySelectorAll<HTMLElement>('.sr');

    if (
      !('IntersectionObserver' in window) ||
      this.reducedMotionMediaQuery.matches
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
    const video = this.heroVideo?.nativeElement;

    if (!video) {
      return;
    }

    const shouldPlay =
      this.desktopMediaQuery.matches &&
      !this.reducedMotionMediaQuery.matches;

    if (!shouldPlay) {
      this.unloadHeroVideo();
      return;
    }

    this.loadAndPlayHeroVideo(video);
  }

  private loadAndPlayHeroVideo(
    video: HTMLVideoElement
  ): void {
    const source =
      video.querySelector<HTMLSourceElement>(
        'source[data-src]'
      );

    if (!this.heroVideoLoaded && source) {
      const sourceUrl = source.dataset['src'];

      if (!sourceUrl) {
        return;
      }

      source.setAttribute('src', sourceUrl);
      source.removeAttribute('data-src');

      video.load();
      this.heroVideoLoaded = true;
    }

    void video.play().catch(() => {
      video.pause();
    });
  }

  private unloadHeroVideo(): void {
    const video = this.heroVideo?.nativeElement;

    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;

    /*
     * Si la vidéo n'a pas encore été chargée,
     * on garde data-src pour permettre son chargement
     * lors d'un passage vers Desktop.
     */
    if (!this.heroVideoLoaded) {
      return;
    }

    const source =
      video.querySelector<HTMLSourceElement>(
        'source'
      );

    if (!source) {
      return;
    }

    const currentSource =
      source.getAttribute('src');

    if (currentSource) {
      source.dataset['src'] = currentSource;
    }

    source.removeAttribute('src');
    video.removeAttribute('src');
    video.load();

    this.heroVideoLoaded = false;
  }

  private destroyHeroVideo(): void {
    const video = this.heroVideo?.nativeElement;

    if (!video) {
      return;
    }

    video.pause();
    video.removeAttribute('src');

    const source =
      video.querySelector<HTMLSourceElement>(
        'source'
      );

    source?.removeAttribute('src');
    video.load();

    this.heroVideoLoaded = false;
  }
}