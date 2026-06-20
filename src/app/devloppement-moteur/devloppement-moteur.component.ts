import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-devloppement-moteur',
  templateUrl: './devloppement-moteur.component.html',
  styleUrls: ['./devloppement-moteur.component.css']
})
export class DevloppementMoteurComponent implements AfterViewInit {

  activeVis: 'brain' | 'hbot' | 'neural' = 'brain';

  switchVis(id: 'brain' | 'hbot' | 'neural'): void {
    this.activeVis = id;
  }

  ngAfterViewInit(): void {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

}
