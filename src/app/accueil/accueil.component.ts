import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

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
    }, 500);
  };

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
      video.querySelector<HTMLSourceElement>('source');

    if (!source) {
      return;
    }

    if (!this.heroVideoLoaded) {
      const sourceUrl =
        source.dataset['src'];

      if (!sourceUrl) {
        return;
      }

      source.setAttribute('src', sourceUrl);
      video.load();

      this.heroVideoLoaded = true;
    }

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
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
    void video.play().catch(() => {
      video.muted = true;

      void video.play().catch(() => {
        // Le poster reste visible si l'autoplay est bloqué.
      });
    });
  }

  private unloadHeroVideo(): void {
    const video = this.heroVideo?.nativeElement;

    if (!video) {
      return;
    }

    video.pause();

    try {
      video.currentTime = 0;
    } catch {
      // La vidéo n'est peut-être pas encore chargée.
    }

    if (!this.heroVideoLoaded) {
      return;
    }

    const source =
      video.querySelector<HTMLSourceElement>('source');

    if (!source) {
      return;
    }

    source.removeAttribute('src');
    video.load();

    this.heroVideoLoaded = false;
  }

  private destroyHeroVideo(): void {
    const video = this.heroVideo?.nativeElement;

    if (!video) {
      return;
    }

    video.pause();

    const source =
      video.querySelector<HTMLSourceElement>('source');

    source?.removeAttribute('src');
    video.load();

    this.heroVideoLoaded = false;
  }
}