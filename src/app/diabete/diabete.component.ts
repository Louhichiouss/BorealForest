import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-diabete',
  templateUrl: './diabete.component.html',
  styleUrls: ['./diabete.component.css']
})
export class DiabeteComponent implements AfterViewInit {

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

    document.querySelectorAll('.sr').forEach(el => observer.observe(el));
  }

}
