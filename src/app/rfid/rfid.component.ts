import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import { AppComponent } from '../app.component';
import { ServiceService } from '../model/service.service';

@Component({
  selector: 'app-rfid',
  templateUrl: './rfid.component.html',
  styleUrls: ['./rfid.component.css']
})
export class RfidComponent implements OnInit, AfterViewInit {

  @ViewChild('rfidInput') rfidInput!: ElementRef<HTMLInputElement>;
  @ViewChild('replaceRfidInput') replaceRfidInput!: ElementRef<HTMLInputElement>;

  uid = '';

  loading = false;
  validating = false;
  renewing = false;
  disabling = false;
  replacing = false;

  errorMessage = '';
  successMessage = '';

  patient: any = null;
  history: any[] = [];

  patientPopupOpen = false;
  renewPopupOpen = false;
  replacePopupOpen = false;

  renewSessions = 5;
  renewAmount = 0;

  replaceUid = '';

  // =========================================================
  // NOUVELLE CARTE / ASSOCIATION PATIENT
  // =========================================================

  associationPopupOpen = false;
  unknownCardUid = '';

  patientSearch = '';
  patientResults: any[] = [];
  selectedPatient: any = null;

  searchingPatients = false;
  associating = false;

  // =========================================================

  logo = '';
  photo = '';
  mobileMenuOpen = false;
  todayDate = new Date();

  constructor(
    private appComponent: AppComponent,
    private service: ServiceService
  ) {}

  ngOnInit(): void {
    this.appComponent.hideHeaderAndFooter = true;
    this.loadAdmin();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.focusScanner(), 300);
  }

  loadAdmin(): void {
    this.service.getSignladmin(1).subscribe({
      next: (res: any) => {
        const admin = res?.data || {};
        this.logo = admin.logo || '';
        this.photo = admin.img || '';
      },

      error: (err: any) => {
        console.log(err);
      }
    });
  }

  formatHeaderDate(): string {
    return this.todayDate.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  // =========================================================
  // SCANNER
  // =========================================================

  focusScanner(): void {
    if (this.rfidInput) {
      this.rfidInput.nativeElement.focus();
    }
  }

  // =========================================================
  // CONVERSION AUTOMATIQUE AZERTY -> UID
  //
  // Lecteur RFID = clavier USB.
  // Sur clavier FR/AZERTY :
  //
  // à = 0
  // & = 1
  // é = 2
  // " = 3
  // ' = 4
  // ( = 5
  // - = 6
  // è = 7
  // _ = 8
  // ç = 9
  //
  // Exemple :
  // lecteur sur clavier français -> à-...
  // devient automatiquement -> 06...
  // =========================================================

  normalizeRfidUid(value: string): string {

    const azertyMap: { [key: string]: string } = {
      'à': '0',
      '&': '1',
      'é': '2',
      '"': '3',
      "'": '4',
      '(': '5',
      '-': '6',
      'è': '7',
      '_': '8',
      'ç': '9'
    };

    return (value || '')
      .split('')
      .map((char: string) => azertyMap[char] ?? char)
      .join('')
      .replace(/[^0-9A-Za-z:_-]/g, '')
      .trim();
  }

  scanCard(): void {

    const cardUid = this.normalizeRfidUid(this.uid);

    if (!cardUid) {
      this.uid = '';
      this.focusScanner();
      return;
    }

    this.loading = true;

    this.errorMessage = '';
    this.successMessage = '';

    this.patient = null;
    this.history = [];

    this.patientPopupOpen = false;

    this.service.rfidLookup(cardUid).subscribe({

      next: (res: any) => {

        this.loading = false;

        if (res?.success) {

          this.patient = res.patient;
          this.history = res.history || [];

        } else {

          this.openAssociationForUnknownCard(cardUid);

        }

        this.uid = '';

        if (!this.associationPopupOpen) {
          setTimeout(() => this.focusScanner(), 100);
        }
      },

      error: (err: any) => {

        this.loading = false;

        if (err?.status === 404) {

          this.openAssociationForUnknownCard(cardUid);

          this.uid = '';

          return;
        }

        this.errorMessage =
          err?.error?.message ||
          'Impossible de lire la carte.';

        this.uid = '';

        setTimeout(() => this.focusScanner(), 100);
      }
    });
  }

  refreshPatient(cardUid?: string): void {

    const uidToLoad =
      cardUid ||
      this.patient?.card_uid;

    if (!uidToLoad) {
      return;
    }

    this.service.rfidLookup(uidToLoad).subscribe({

      next: (res: any) => {

        if (res?.success) {

          this.patient = res.patient;
          this.history = res.history || [];

        }
      },

      error: (err: any) => {

        this.errorMessage =
          err?.error?.message ||
          'Impossible de recharger le patient.';
      }
    });
  }

  // =========================================================
  // ASSOCIATION NOUVELLE CARTE
  // =========================================================

  openAssociationForUnknownCard(cardUid: string): void {

    this.unknownCardUid =
      this.normalizeRfidUid(cardUid);

    this.patientSearch = '';
    this.patientResults = [];
    this.selectedPatient = null;

    this.searchingPatients = false;
    this.associating = false;

    this.errorMessage = '';
    this.successMessage = '';

    this.associationPopupOpen = true;
  }

  searchPatients(): void {

    const q = (this.patientSearch || '').trim();

    if (q.length < 2) {

      this.patientResults = [];
      this.selectedPatient = null;

      return;
    }

    this.searchingPatients = true;

    this.service.searchPatient(q).subscribe({

      next: (res: any) => {

        this.searchingPatients = false;

        if (Array.isArray(res)) {

          this.patientResults = res;

        } else if (Array.isArray(res?.data)) {

          this.patientResults = res.data;

        } else if (Array.isArray(res?.patients)) {

          this.patientResults = res.patients;

        } else {

          this.patientResults = [];
        }
      },

      error: () => {

        this.searchingPatients = false;
        this.patientResults = [];
      }
    });
  }

  selectPatientForCard(patient: any): void {
    this.selectedPatient = patient;
  }

  closeAssociation(): void {

    if (this.associating) {
      return;
    }

    this.associationPopupOpen = false;

    this.unknownCardUid = '';

    this.patientSearch = '';
    this.patientResults = [];
    this.selectedPatient = null;

    this.searchingPatients = false;

    setTimeout(() => this.focusScanner(), 100);
  }

  associateCard(): void {

    if (
      !this.selectedPatient?.P_id ||
      !this.unknownCardUid
    ) {
      return;
    }

    const cardUid =
      this.normalizeRfidUid(this.unknownCardUid);

    const patientId =
      Number(this.selectedPatient.P_id);

    if (!cardUid || !patientId) {
      return;
    }

    const ok = confirm(
      'Associer la carte ' +
      cardUid +
      ' à ' +
      this.selectedPatient.P_prenom +
      ' ' +
      this.selectedPatient.P_nom +
      ' ?'
    );

    if (!ok) {
      return;
    }

    this.associating = true;

    this.errorMessage = '';
    this.successMessage = '';

    this.service
      .rfidAssociate(
        patientId,
        cardUid
      )
      .subscribe({

        next: (res: any) => {

          this.associating = false;

          if (!res?.success) {

            this.errorMessage =
              res?.message ||
              'Impossible d’associer la carte.';

            return;
          }

          this.associationPopupOpen = false;

          this.unknownCardUid = '';

          this.patientSearch = '';
          this.patientResults = [];
          this.selectedPatient = null;

          this.successMessage =
            'Carte associée avec succès ✓';

          this.refreshPatient(cardUid);
        },

        error: (err: any) => {

          this.associating = false;

          this.errorMessage =
            err?.error?.message ||
            'Impossible d’associer la carte.';
        }
      });
  }

  // =========================================================
  // POPUP PATIENT
  // =========================================================

  openPatient(): void {

    if (!this.patient) {
      return;
    }

    this.patientPopupOpen = true;
  }

  closePatient(): void {

    this.patientPopupOpen = false;
    this.renewPopupOpen = false;
    this.replacePopupOpen = false;

    setTimeout(() => this.focusScanner(), 100);
  }

  // =========================================================
  // VALIDATION SEANCE
  // =========================================================

  validateSession(): void {

    if (!this.patient?.card_uid) {
      return;
    }

    if (
      Number(this.patient.remaining_sessions) <= 0
    ) {

      this.errorMessage =
        'Aucune séance restante. Renouvelez le pack.';

      return;
    }

    const ok = confirm(
      'Confirmer la séance de ' +
      this.patient.P_prenom +
      ' ' +
      this.patient.P_nom +
      ' ?\n\nSéances restantes avant validation : ' +
      this.patient.remaining_sessions
    );

    if (!ok) {
      return;
    }

    this.validating = true;

    this.errorMessage = '';
    this.successMessage = '';

    const cardUid =
      this.patient.card_uid;

    this.service
      .rfidValidateSession(cardUid)
      .subscribe({

        next: (res: any) => {

          this.validating = false;

          if (!res?.success) {

            this.errorMessage =
              res?.message ||
              'Impossible de valider la séance.';

            return;
          }

          this.successMessage =
            'Séance validée avec succès ✓';

          this.refreshPatient(cardUid);
        },

        error: (err: any) => {

          this.validating = false;

          this.errorMessage =
            err?.error?.message ||
            'Impossible de valider la séance.';
        }
      });
  }

  // =========================================================
  // RENOUVELLEMENT PACK
  // =========================================================

  openRenew(): void {

    this.renewSessions = 5;
    this.renewAmount = 0;

    this.errorMessage = '';

    this.renewPopupOpen = true;
  }

  closeRenew(): void {
    this.renewPopupOpen = false;
  }

  renewPack(): void {

    if (!this.patient?.card_uid) {
      return;
    }

    const sessions =
      Number(this.renewSessions);

    const amount =
      Number(this.renewAmount);

    if (
      !sessions ||
      sessions <= 0
    ) {

      this.errorMessage =
        'Nombre de séances invalide.';

      return;
    }

    if (amount < 0) {

      this.errorMessage =
        'Montant invalide.';

      return;
    }

    const ok = confirm(
      'Ajouter ' +
      sessions +
      ' séances au pack de ' +
      this.patient.P_prenom +
      ' ' +
      this.patient.P_nom +
      ' ?'
    );

    if (!ok) {
      return;
    }

    this.renewing = true;

    this.errorMessage = '';
    this.successMessage = '';

    const cardUid =
      this.patient.card_uid;

    this.service
      .rfidRenewPack(
        cardUid,
        sessions,
        amount
      )
      .subscribe({

        next: (res: any) => {

          this.renewing = false;

          if (!res?.success) {

            this.errorMessage =
              res?.message ||
              'Impossible de renouveler le pack.';

            return;
          }

          this.successMessage =
            'Pack renouvelé avec succès ✓';

          this.renewPopupOpen = false;

          this.refreshPatient(cardUid);
        },

        error: (err: any) => {

          this.renewing = false;

          this.errorMessage =
            err?.error?.message ||
            'Impossible de renouveler le pack.';
        }
      });
  }

  // =========================================================
  // REMPLACEMENT CARTE
  // =========================================================

  openReplace(): void {

    if (!this.patient) {
      return;
    }

    this.replaceUid = '';

    this.errorMessage = '';
    this.successMessage = '';

    this.replacePopupOpen = true;

    setTimeout(() => {

      if (this.replaceRfidInput) {

        this.replaceRfidInput
          .nativeElement
          .focus();
      }

    }, 150);
  }

  closeReplace(): void {

    this.replacePopupOpen = false;
    this.replaceUid = '';

    setTimeout(() => this.focusScanner(), 100);
  }

  replaceCard(): void {

    if (!this.patient?.P_id) {
      return;
    }

    // Conversion AZERTY automatique aussi ici
    const newUid =
      this.normalizeRfidUid(this.replaceUid);

    if (!newUid) {
      return;
    }

    if (
      newUid === this.patient.card_uid
    ) {

      this.errorMessage =
        'Cette carte est déjà associée à ce patient.';

      return;
    }

    const oldUid =
      this.patient.card_uid;

    const ok = confirm(
      'Remplacer la carte ' +
      oldUid +
      ' par ' +
      newUid +
      ' ?'
    );

    if (!ok) {
      return;
    }

    this.replacing = true;

    this.errorMessage = '';
    this.successMessage = '';

    this.service
      .rfidReplace(
        Number(this.patient.P_id),
        newUid
      )
      .subscribe({

        next: (res: any) => {

          this.replacing = false;

          if (!res?.success) {

            this.errorMessage =
              res?.message ||
              'Impossible de remplacer la carte.';

            return;
          }

          this.replacePopupOpen = false;
          this.replaceUid = '';

          this.successMessage =
            'Carte remplacée avec succès ✓';

          this.refreshPatient(newUid);
        },

        error: (err: any) => {

          this.replacing = false;

          this.errorMessage =
            err?.error?.message ||
            'Impossible de remplacer la carte.';
        }
      });
  }

  // =========================================================
  // DESACTIVATION CARTE
  // =========================================================

  disableCard(): void {

    if (!this.patient?.card_uid) {
      return;
    }

    const ok = confirm(
      'Désactiver la carte ' +
      this.patient.card_uid +
      ' de ' +
      this.patient.P_prenom +
      ' ' +
      this.patient.P_nom +
      ' ?\n\nLe patient ne sera pas supprimé.'
    );

    if (!ok) {
      return;
    }

    this.disabling = true;

    this.errorMessage = '';
    this.successMessage = '';

    this.service
      .rfidDisable(
        this.patient.card_uid
      )
      .subscribe({

        next: (res: any) => {

          this.disabling = false;

          if (!res?.success) {

            this.errorMessage =
              res?.message ||
              'Impossible de désactiver la carte.';

            return;
          }

          this.patientPopupOpen = false;

          this.patient = null;
          this.history = [];

          this.successMessage =
            'Carte désactivée avec succès ✓';

          setTimeout(
            () => this.focusScanner(),
            100
          );
        },

        error: (err: any) => {

          this.disabling = false;

          this.errorMessage =
            err?.error?.message ||
            'Impossible de désactiver la carte.';
        }
      });
  }

  // =========================================================
  // RESET
  // =========================================================

  reset(): void {

    this.uid = '';

    this.patient = null;
    this.history = [];

    this.errorMessage = '';
    this.successMessage = '';

    this.patientPopupOpen = false;
    this.renewPopupOpen = false;
    this.replacePopupOpen = false;

    this.associationPopupOpen = false;
    this.unknownCardUid = '';

    this.patientSearch = '';
    this.patientResults = [];
    this.selectedPatient = null;

    this.searchingPatients = false;
    this.associating = false;

    setTimeout(
      () => this.focusScanner(),
      100
    );
  }

  // =========================================================
  // LABEL HISTORIQUE
  // =========================================================

  eventLabel(type: string): string {

    switch (type) {

      case 'card_assigned':
        return 'Carte associée';

      case 'session_validated':
        return 'Séance validée';

      case 'pack_renewed':
        return 'Pack renouvelé';

      case 'card_disabled':
        return 'Carte désactivée';

      case 'card_replaced':
        return 'Carte remplacée';

      default:
        return type;
    }
  }
}