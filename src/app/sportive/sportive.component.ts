import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-sportive',
  templateUrl: './sportive.component.html',
  styleUrls: ['./sportive.component.css']
})
export class SportiveComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.01,
      rootMargin: '0px 0px -20px 0px'
    });

    document.querySelectorAll('.sr').forEach(el => {
      observer.observe(el);
    });
  }

}
