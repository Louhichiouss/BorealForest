
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LexperienceComponent,
    ConferencesComponent,
    PrincpeDeBaseComponent,
    DevloppementMoteurComponent,
    LesCapaciteCognitivesComponent,
    DevloppementDeParaoleComponent,
    LaGestionDeLaDouleurComponent,
    EspaceDeVenteComponent,
    ContactNousComponent,
    SommeilEnergieComponent,
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
    DepenseComponent,
    MarketingComponent,
    FactureComponent
  ],

  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DayPilotModule,
    NgApexchartsModule,
    BsDatepickerModule.forRoot()
  ],

  providers: [
    { provide: LOCALE_ID, useValue: 'fr-TN' }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
