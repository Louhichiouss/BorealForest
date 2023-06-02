import { HostListener, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';

import { LexperienceComponent } from './lexperience/lexperience.component';
import { ConferencesComponent } from './conferences/conferences.component';

// import { DocumentationComponent } from './documentation/documentation.component';
import { PrincpeDeBaseComponent } from './princpe-de-base/princpe-de-base.component';
import { DevloppementMoteurComponent } from './devloppement-moteur/devloppement-moteur.component';
import { LesCapaciteCognitivesComponent } from './les-capacite-cognitives/les-capacite-cognitives.component';
import { DevloppementDeParaoleComponent } from './devloppement-de-parole/devloppement-de-paraole.component';
import { LaGestionDeLaDouleurComponent } from './la-gestion-de-la-douleur/la-gestion-de-la-douleur.component';

import { EspaceDeVenteComponent } from './espace-de-vente/espace-de-vente.component';
import { ContactNousComponent } from './contact-nous/contact-nous.component';
import { SommeilEnergieComponent } from './sommeil-energie/sommeil-energie.component';
// import { QuiSommeNousComponent } from './qui-somme-nous/qui-somme-nous.component';
import { SeancesComponent } from './seances/seances.component';
import {  ReactiveFormsModule,FormsModule, EmailValidator } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { ConcussionComponent } from './concussion/concussion.component';
import { BorealForestComponent } from './boreal-forest/boreal-forest.component';
import { ChirurgiComponent } from './chirurgi/chirurgi.component';
import { PerteAuditiveComponent } from './perte-auditive/perte-auditive.component';
import { ChronicPainComponent } from './chronic-pain/chronic-pain.component';
import { FertiliteComponent } from './fertilite/fertilite.component';
import { MigrainesComponent } from './migraines/migraines.component';
import { Covid19Component } from './covid19/covid19.component';
import { DiabeteComponent } from './diabete/diabete.component';
import { EsthestiqueComponent } from './esthestique/esthestique.component';
import { AutistesComponent } from './autistes/autistes.component';
import { BeautyComponent } from './beauty/beauty.component';
import { CerveauComponent } from './cerveau/cerveau.component';
import { SportiveComponent } from './sportive/sportive.component';
import { ConnecteComponent } from './connecte/connecte.component';
import { AdminComponent } from './admin/admin.component';
import { MedecinComponent } from './medecin/medecin.component';
import { PatientComponent } from './patient/patient.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { AjoutepatientComponent } from './ajoutepatient/ajoutepatient.component';
import { MatrielComponent } from './matriel/matriel.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { RecetteComponent } from './recette/recette.component';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { ParametreComponent } from './parametre/parametre.component';
import { PinterfaceComponent } from './pinterface/pinterface.component';
import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProfilComponent } from './profil/profil.component';
import { NotificationComponent } from './notification/notification.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


// FullCalendarModule.registerPlugins([
//   interactionPlugin,
//   dayGridPlugin
// ])


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
   
    LexperienceComponent,
    ConferencesComponent,

    // DocumentationComponent,
    PrincpeDeBaseComponent,
    DevloppementMoteurComponent,
    LesCapaciteCognitivesComponent,
    DevloppementDeParaoleComponent,
    LaGestionDeLaDouleurComponent,
   
    EspaceDeVenteComponent,
    ContactNousComponent,
    SommeilEnergieComponent,
    // QuiSommeNousComponent,
    SeancesComponent,
    HeaderComponent,
    FooterComponent,
    BlogComponent,
    ConcussionComponent,
    BorealForestComponent,
    ChirurgiComponent,
    PerteAuditiveComponent,
    ChronicPainComponent,
    FertiliteComponent,
    MigrainesComponent,
    Covid19Component,
    DiabeteComponent,
    EsthestiqueComponent,
    AutistesComponent,
    BeautyComponent,
    CerveauComponent,
    SportiveComponent,
    ConnecteComponent,
    AdminComponent,
    MedecinComponent,
    PatientComponent,
    SidebarComponent,
    DashboardComponent,
    SidenavComponent,

     AjoutepatientComponent,
      MatrielComponent,
      RendezvousComponent,
      RecetteComponent,
      ParametreComponent,
      PinterfaceComponent,
      ProfilComponent,
      NotificationComponent,
 
    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  BrowserAnimationsModule,
  DayPilotModule,
  NgApexchartsModule,
  
  BsDatepickerModule,
 


  ],
  providers: [
      // set the timezone to West Central Africa (Tunisia)
    { provide: LOCALE_ID, useValue: 'fr-TN' }
  ],
 
  bootstrap: [AppComponent]

})
export class AppModule { }
