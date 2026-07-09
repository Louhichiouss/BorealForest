import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BorealForest';
  hideHeaderAndFooter = false;

  seoData: any = {
  '/': {
    title: "Centre d'Oxygénothérapie Hyperbare en Tunisie | BorealForest",
    description: "Centre d'oxygénothérapie hyperbare en Tunisie. Séances à Tunis, Sousse et Sfax.",
    canonical: "https://www.oxyboreal.com/"
  },
  '/accueil': {
    title: "Centre d'Oxygénothérapie Hyperbare en Tunisie | BorealForest",
    description: "Découvrez BorealForest, centre d'oxygénothérapie hyperbare à Tunis, Sousse et Sfax.",
    canonical: "https://www.oxyboreal.com/"
  },
  '/seance': {
    title: "Séances d'Oxygénothérapie Hyperbare | BorealForest",
    description: "Découvrez le déroulement des séances d'oxygénothérapie hyperbare chez BorealForest.",
    canonical: "https://www.oxyboreal.com/seance"
  },
  '/contact-nous': {
    title: "Contact BorealForest | Oxygénothérapie Hyperbare Tunisie",
    description: "Contactez BorealForest pour réserver une séance à Tunis, Sousse ou Sfax.",
    canonical: "https://www.oxyboreal.com/contact-nous"
  },
  '/blog': {
    title: "Blog Oxygénothérapie Hyperbare | BorealForest",
    description: "Articles et conseils sur l'oxygénothérapie hyperbare, la récupération et le bien-être.",
    canonical: "https://www.oxyboreal.com/blog"
  },
  '/BorealForest': {
    title: "À propos de BorealForest | Centre Hyperbare Tunisie",
    description: "Découvrez BorealForest, centre spécialisé en oxygénothérapie hyperbare en Tunisie.",
    canonical: "https://www.oxyboreal.com/BorealForest"
  },
  '/lexpeience': {
    title: "Expérience en Chambre Hyperbare | BorealForest",
    description: "Vivez une expérience d'oxygénothérapie hyperbare dans un environnement moderne et apaisant.",
    canonical: "https://www.oxyboreal.com/lexpeience"
  },
  '/conferences': {
    title: "Conférences Oxygénothérapie Hyperbare | BorealForest",
    description: "Conférences et informations sur l'oxygénothérapie hyperbare et ses applications.",
    canonical: "https://www.oxyboreal.com/conferences"
  },
  '/principe-de-base': {
    title: "Principe de l'Oxygénothérapie Hyperbare | BorealForest",
    description: "Comprendre le principe de base de l'oxygénothérapie hyperbare et son fonctionnement.",
    canonical: "https://www.oxyboreal.com/principe-de-base"
  },
  '/devloppement-moteur': {
    title: "Développement Moteur et Oxygénothérapie Hyperbare | BorealForest",
    description: "Découvrez le rôle de l'oxygénothérapie hyperbare dans l'accompagnement du développement moteur.",
    canonical: "https://www.oxyboreal.com/devloppement-moteur"
  },
  '/les-capacite-congnitives': {
    title: "Capacités Cognitives et Oxygénothérapie Hyperbare | BorealForest",
    description: "Informations sur l'oxygénothérapie hyperbare et l'accompagnement des capacités cognitives.",
    canonical: "https://www.oxyboreal.com/les-capacite-congnitives"
  },
  '/devloppement-de-parole': {
    title: "Développement de la Parole et Oxygénothérapie Hyperbare | BorealForest",
    description: "Découvrez comment l'oxygénothérapie hyperbare peut accompagner le développement de la parole.",
    canonical: "https://www.oxyboreal.com/devloppement-de-parole"
  },
  '/la-gestion-de-la-douleur': {
    title: "Gestion de la Douleur et Oxygénothérapie Hyperbare | BorealForest",
    description: "L'oxygénothérapie hyperbare peut accompagner la gestion de la douleur et la récupération.",
    canonical: "https://www.oxyboreal.com/la-gestion-de-la-douleur"
  },
  '/espace-de-vente': {
    title: "Espace de Vente BorealForest | Oxygénothérapie Hyperbare",
    description: "Découvrez l'espace de vente BorealForest et nos informations sur l'oxygénothérapie hyperbare.",
    canonical: "https://www.oxyboreal.com/espace-de-vente"
  },
  '/sommeil-energie': {
    title: "Sommeil et Énergie | Oxygénothérapie Hyperbare BorealForest",
    description: "Découvrez les effets de l'oxygénothérapie hyperbare sur l'énergie, le sommeil et le bien-être.",
    canonical: "https://www.oxyboreal.com/sommeil-energie"
  },
  '/concussion': {
    title: "Commotion Cérébrale et Oxygénothérapie Hyperbare | BorealForest",
    description: "Informations sur l'oxygénothérapie hyperbare et l'accompagnement après commotion cérébrale.",
    canonical: "https://www.oxyboreal.com/concussion"
  },
  '/Recuperation_chirurgicale': {
    title: "Récupération Chirurgicale et Oxygénothérapie Hyperbare | BorealForest",
    description: "Découvrez l'oxygénothérapie hyperbare pour accompagner la récupération après une chirurgie.",
    canonical: "https://www.oxyboreal.com/Recuperation_chirurgicale"
  },
  '/surdite_brusque': {
    title: "Surdité Brusque et Oxygénothérapie Hyperbare | BorealForest",
    description: "Informations sur l'oxygénothérapie hyperbare et la surdité brusque.",
    canonical: "https://www.oxyboreal.com/surdite_brusque"
  },
  '/douleur_chronique': {
    title: "Douleur Chronique et Oxygénothérapie Hyperbare | BorealForest",
    description: "L'oxygénothérapie hyperbare peut accompagner les personnes souffrant de douleur chronique.",
    canonical: "https://www.oxyboreal.com/douleur_chronique"
  },
  '/fertilité': {
    title: "Fertilité et Oxygénothérapie Hyperbare | BorealForest",
    description: "Découvrez des informations sur l'oxygénothérapie hyperbare et l'accompagnement de la fertilité.",
    canonical: "https://www.oxyboreal.com/fertilité"
  },
  '/migraines': {
    title: "Migraines et Oxygénothérapie Hyperbare | BorealForest",
    description: "Informations sur l'oxygénothérapie hyperbare et l'accompagnement des migraines.",
    canonical: "https://www.oxyboreal.com/migraines"
  },
  '/covid_19': {
    title: "Post-Covid et Oxygénothérapie Hyperbare | BorealForest",
    description: "Découvrez l'oxygénothérapie hyperbare et l'accompagnement de la récupération post-Covid.",
    canonical: "https://www.oxyboreal.com/covid_19"
  },
  '/diabete': {
    title: "Diabète et Oxygénothérapie Hyperbare | BorealForest",
    description: "Informations sur l'oxygénothérapie hyperbare et l'accompagnement des personnes diabétiques.",
    canonical: "https://www.oxyboreal.com/diabete"
  },
  '/esthétique': {
    title: "Esthétique et Oxygénothérapie Hyperbare | BorealForest",
    description: "Découvrez l'oxygénothérapie hyperbare pour la peau, l'esthétique et le bien-être.",
    canonical: "https://www.oxyboreal.com/esthétique"
  },
  '/autistes': {
    title: "Autisme et Oxygénothérapie Hyperbare | BorealForest",
    description: "Informations sur l'oxygénothérapie hyperbare et l'accompagnement de l'autisme.",
    canonical: "https://www.oxyboreal.com/autistes"
  },
  '/beauty': {
    title: "Beauté et Anti-Âge | Oxygénothérapie Hyperbare BorealForest",
    description: "Découvrez les bienfaits de l'oxygénothérapie hyperbare pour la beauté, la peau et l'anti-âge.",
    canonical: "https://www.oxyboreal.com/beauty"
  },
  '/cerveau': {
    title: "Cerveau et Oxygénothérapie Hyperbare | BorealForest",
    description: "Découvrez l'oxygénothérapie hyperbare pour accompagner la santé cérébrale et la récupération.",
    canonical: "https://www.oxyboreal.com/cerveau"
  },
  '/sportive': {
    title: "Récupération Sportive et Oxygénothérapie Hyperbare | BorealForest",
    description: "L'oxygénothérapie hyperbare accompagne la récupération sportive à Tunis, Sousse et Sfax.",
    canonical: "https://www.oxyboreal.com/sportive"
  }
};

  constructor(
    private router: Router,
    private titleService: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects.split('?')[0];
        const seo = this.seoData[url] || this.seoData['/'];

        this.titleService.setTitle(seo.title);

        this.meta.updateTag({
          name: 'description',
          content: seo.description
        });

        this.setCanonical(seo.canonical);
      });
  }

  setCanonical(url: string) {
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");

    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }
}