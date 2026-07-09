import { NgModule, Inject } from '@angular/core';
import { ServerModule, BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

const canonicalMap: any = {
  '/': 'https://www.oxyboreal.com/',
  '/accueil': 'https://www.oxyboreal.com/accueil',
  '/contact-nous': 'https://www.oxyboreal.com/contact-nous',
  '/seance': 'https://www.oxyboreal.com/seance',
  '/blog': 'https://www.oxyboreal.com/blog',
  '/BorealForest': 'https://www.oxyboreal.com/BorealForest',
  '/espace-de-vente': 'https://www.oxyboreal.com/espace-de-vente',
  '/conferences': 'https://www.oxyboreal.com/conferences',
  '/principe-de-base': 'https://www.oxyboreal.com/principe-de-base',
  '/sommeil-energie': 'https://www.oxyboreal.com/sommeil-energie',
  '/sportive': 'https://www.oxyboreal.com/sportive',
  '/diabete': 'https://www.oxyboreal.com/diabete',
  '/cerveau': 'https://www.oxyboreal.com/cerveau',
  '/concussion': 'https://www.oxyboreal.com/concussion',
  '/Recuperation_chirurgicale': 'https://www.oxyboreal.com/Recuperation_chirurgicale',
  '/surdite_brusque': 'https://www.oxyboreal.com/surdite_brusque',
  '/douleur_chronique': 'https://www.oxyboreal.com/douleur_chronique',
 '/fertilite': 'https://www.oxyboreal.com/fertilite',
  '/migraines': 'https://www.oxyboreal.com/migraines',
  '/covid_19': 'https://www.oxyboreal.com/covid_19',
  '/devloppement-de-parole': 'https://www.oxyboreal.com/devloppement-de-parole',
  '/devloppement-moteur': 'https://www.oxyboreal.com/devloppement-moteur',
  '/la-gestion-de-la-douleur': 'https://www.oxyboreal.com/la-gestion-de-la-douleur',
  '/les-capacite-congnitives': 'https://www.oxyboreal.com/les-capacite-congnitives',
  '/lexpeience': 'https://www.oxyboreal.com/lexpeience',
  '/autistes': 'https://www.oxyboreal.com/autistes',
  '/beauty': 'https://www.oxyboreal.com/beauty',
 '/esthetique': 'https://www.oxyboreal.com/esthetique'
};

export function addCanonical(document: Document, router: Router) {
  return () => {
    const url = router.url.split('?')[0];
    const canonical = canonicalMap[url] || 'https://www.oxyboreal.com/';

    document.querySelectorAll("link[rel='canonical']").forEach(link => link.remove());

    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', canonical);
    document.head.appendChild(link);
  };
}

@NgModule({
  imports: [
    AppModule,
    ServerModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: BEFORE_APP_SERIALIZED,
      useFactory: addCanonical,
      deps: [DOCUMENT, Router],
      multi: true
    }
  ]
})
export class AppServerModule {}