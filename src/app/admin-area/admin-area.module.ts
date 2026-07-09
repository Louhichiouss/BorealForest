import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';

import { AdminComponent } from '../admin/admin.component';
import { MedecinComponent } from '../medecin/medecin.component';
import { PatientComponent } from '../patient/patient.component';
import { AjoutepatientComponent } from '../ajoutepatient/ajoutepatient.component';
import { MatrielComponent } from '../matriel/matriel.component';
import { RendezvousComponent } from '../rendezvous/rendezvous.component';
import { RecetteComponent } from '../recette/recette.component';
import { ParametreComponent } from '../parametre/parametre.component';
import { PinterfaceComponent } from '../pinterface/pinterface.component';
import { ProfilComponent } from '../profil/profil.component';
import { NotificationComponent } from '../notification/notification.component';
import { DepenseComponent } from '../depense/depense.component';
import { MarketingComponent } from '../marketing/marketing.component';
import { FactureComponent } from '../facture/facture.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'medecin', component: MedecinComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'patient/:id', component: PatientComponent },
  { path: 'ajoutepatient', component: AjoutepatientComponent },
  { path: 'matriel', component: MatrielComponent },
  { path: 'matriel/:id', component: MatrielComponent },
  { path: 'rendezvous', component: RendezvousComponent },
  { path: 'recette', component: RecetteComponent },
  { path: 'recette/:id', component: RecetteComponent },
  { path: 'parametre', component: ParametreComponent },
  { path: 'pinterface', component: PinterfaceComponent },
  { path: 'pinterface/:id', component: PinterfaceComponent },
  { path: 'pinterface/:id/:id', component: PinterfaceComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'profil/:id', component: ProfilComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'notification/:id', component: NotificationComponent },
  { path: 'depense', component: DepenseComponent },
  { path: 'depense/:id', component: DepenseComponent },
  { path: 'marketing', component: MarketingComponent },
  { path: 'facture', component: FactureComponent }
];

@NgModule({
  declarations: [
    AdminComponent,
    MedecinComponent,
    PatientComponent,
    AjoutepatientComponent,
    MatrielComponent,
    RendezvousComponent,
    RecetteComponent,
    ParametreComponent,
    PinterfaceComponent,
    ProfilComponent,
    NotificationComponent,
    DepenseComponent,
    MarketingComponent,
    FactureComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    DayPilotModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminAreaModule {}