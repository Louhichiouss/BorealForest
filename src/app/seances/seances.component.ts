import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.css']
})
export class SeancesComponent implements OnInit, AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.sr').forEach((el) => {
      this.observer?.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
