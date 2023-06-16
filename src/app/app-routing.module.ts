import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';

import { AdminComponent } from './admin/admin.component';
import { AjoutepatientComponent } from './ajoutepatient/ajoutepatient.component';
import { AutistesComponent } from './autistes/autistes.component';
import { BeautyComponent } from './beauty/beauty.component';
import { BlogComponent } from './blog/blog.component';
import { BorealForestComponent } from './boreal-forest/boreal-forest.component';
import { CerveauComponent } from './cerveau/cerveau.component';
import { ChirurgiComponent } from './chirurgi/chirurgi.component';
import { ChronicPainComponent } from './chronic-pain/chronic-pain.component';
import { ConcussionComponent } from './concussion/concussion.component';
import { ConferencesComponent } from './conferences/conferences.component';
import { ConnecteComponent } from './connecte/connecte.component';
import { ContactNousComponent } from './contact-nous/contact-nous.component';
import { Covid19Component } from './covid19/covid19.component';
import { DevloppementDeParaoleComponent } from './devloppement-de-parole/devloppement-de-paraole.component';
import { DevloppementMoteurComponent } from './devloppement-moteur/devloppement-moteur.component';
import { DiabeteComponent } from './diabete/diabete.component';

// import { DocumentationComponent } from './documentation/documentation.component';
import { EspaceDeVenteComponent } from './espace-de-vente/espace-de-vente.component';
import { EsthestiqueComponent } from './esthestique/esthestique.component';
import { FertiliteComponent } from './fertilite/fertilite.component';
import { LaGestionDeLaDouleurComponent } from './la-gestion-de-la-douleur/la-gestion-de-la-douleur.component';
import { LesCapaciteCognitivesComponent } from './les-capacite-cognitives/les-capacite-cognitives.component';
import { LexperienceComponent } from './lexperience/lexperience.component';
import { MedecinComponent } from './medecin/medecin.component';
import { MigrainesComponent } from './migraines/migraines.component';

import { PatientComponent } from './patient/patient.component';
import { PerteAuditiveComponent } from './perte-auditive/perte-auditive.component';
import { PrincpeDeBaseComponent } from './princpe-de-base/princpe-de-base.component';
// import { QuiSommeNousComponent } from './qui-somme-nous/qui-somme-nous.component';
import { SeancesComponent } from './seances/seances.component';


import { SommeilEnergieComponent } from './sommeil-energie/sommeil-energie.component';
import { SportiveComponent } from './sportive/sportive.component';
import { MatrielComponent } from './matriel/matriel.component';
import { RendezvousComponent } from './rendezvous/rendezvous.component';
import { RecetteComponent } from './recette/recette.component';
import { ParametreComponent } from './parametre/parametre.component';
import { PinterfaceComponent } from './pinterface/pinterface.component';
import { ProfilComponent } from './profil/profil.component';
import { NotificationComponent } from './notification/notification.component';
import { DepenseComponent } from './depense/depense.component';


const routes: Routes = [
  {path:'',redirectTo:'accueil',pathMatch:'full'  },
  
    { path:"accueil",component:AccueilComponent},
    { path:"concussion",component:ConcussionComponent},
    { path:"BorealForest",component:BorealForestComponent},
    { path:"Recuperation_chirurgicale",component:ChirurgiComponent},
    { path:"surdite_brusque",component:PerteAuditiveComponent},
    { path:"douleur_chronique",component:ChronicPainComponent},
    { path:"fertilité",component:FertiliteComponent},
    { path:"migraines",component:MigrainesComponent},
    { path:"covid_19",component:Covid19Component},
    { path:"beauty",component:BeautyComponent},

    { path:"conferences",component:ConferencesComponent},
    { path:"contact-nous",component:ContactNousComponent},
    { path:"devloppement-de-parole",component:DevloppementDeParaoleComponent},
    { path:"devloppement-moteur",component:DevloppementMoteurComponent},
    // {path:"documentation",component:DocumentationComponent},
    {path:"espace-de-vente",component:EspaceDeVenteComponent},
    {path:"la-gestion-de-la-douleur",component:LaGestionDeLaDouleurComponent},
    {path:"les-capacite-congnitives",component:LesCapaciteCognitivesComponent},
    {path:"lexpeience",component:LexperienceComponent},
    {path:"principe-de-base",component:PrincpeDeBaseComponent},
    {path:"diabete",component:DiabeteComponent},
    {path:"autistes",component:AutistesComponent},
    {path:"cerveau ",component:CerveauComponent},
    {path:"esthétique",component:EsthestiqueComponent},
    {path:"sportive",component:SportiveComponent},
    {path:"connecte",component:ConnecteComponent},
    {path:"admin",component:AdminComponent},
    {path:"medecin",component:MedecinComponent},
    {path:"patient",component:PatientComponent},
    {path:"patient/:id",component:PatientComponent},
    {path:"ajoutepatient",component:AjoutepatientComponent},
    {path:"matriel",component:MatrielComponent},
    {path:"matriel/:id",component:MatrielComponent},
    {path:"rendezvous",component:RendezvousComponent},

    {path:"recette",component:RecetteComponent},
    {path:"recette/:id",component:RecetteComponent},
    {path:"parametre",component:ParametreComponent},

    {path:"pinterface",component:PinterfaceComponent},

    {path:"profil",component:ProfilComponent},


    {path:"profil/:id",component:ProfilComponent},


    {path:"notification",component:NotificationComponent},

    {path:"notification/:id",component:NotificationComponent},


    {path:"pinterface/:id",component:PinterfaceComponent},
    {path:"connecte/:id",component:ConnecteComponent},
    {path:"pinterface/:id/:id",component:PinterfaceComponent},
    
    {path:"depense",component:DepenseComponent},











   
// { path:"qui-somme-nous",component:QuiSommeNousComponent},
{ path:"seance",component:SeancesComponent},  
    {path:"sommeil-energie",component:SommeilEnergieComponent},
    {path:"blog",component:BlogComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
