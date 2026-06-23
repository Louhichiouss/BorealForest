import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../model/service.service';
import { User } from '../model/user';

@Component({
  selector: 'app-contact-nous',
  templateUrl: './contact-nous.component.html',
  styleUrls: ['./contact-nous.component.css']
})
export class ContactNousComponent implements OnInit, AfterViewInit, OnDestroy {
  addForm = this.formBuilder.group({
    nom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', Validators.required],
    msg: ['', Validators.required]
  });

  users: User[] = [];
  errorMessage1 = '';
  private observer?: IntersectionObserver;

  constructor(
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

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

  resetMessage(): void {
    this.errorMessage1 = '';
  }

  ajout(): void {
    if (this.addForm.invalid) {
      alert('Tous les champs sont obligatoires.');
      return;
    }

    const tel = String(this.addForm.value.tel || '').replace(/\s/g, '');
    if (tel.length < 8 || tel.length > 12) {
      alert('Veuillez saisir un numéro de téléphone valide.');
      return;
    }

 this.service.ajouterUser(this.addForm.value as any).subscribe({
  next: () => {
    this.addForm.reset();
    this.errorMessage1 = 'Votre message a été envoyé.';
  },
  error: (err) => {
    console.log('Erreur API:', err);

    this.errorMessage1 =
      err?.error?.message ||
      "Erreur: le message n'a pas été envoyé.";
  }
});
  }
}
