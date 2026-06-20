import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../model/service.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, AfterViewInit, OnDestroy {
  private scrollHandler = () => {
    const nav = document.getElementById('bfNav');
    if (nav) {
      nav.classList.toggle('solid', window.scrollY > 50);
    }
  };

  private observer?: IntersectionObserver;

  constructor(
    private service: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.scrollHandler);
    this.scrollHandler();

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.sr').forEach((el) => {
      this.observer?.observe(el);
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
    this.observer?.disconnect();
  }
}
