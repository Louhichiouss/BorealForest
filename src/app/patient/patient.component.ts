import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ServiceService } from '../model/service.service';
import { Patient } from '../model/user';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];

  searchText = '';
  centerFilter = '';
  am = 0;

  tunisCount = 0;
  sousseCount = 0;
  sfaxCount = 0;
logo = '';
photo = '';
  showFormModal = false;
  showDetailsModal = false;
  isEditMode = false;
  selectedPatient: any = null;

  todayDate = new Date();

  patientForm = this.fb.group({
    P_id: [null],
    P_nom: ['', Validators.required],
    P_prenom: ['', Validators.required],
    P_tel: ['', Validators.required],
    P_email: ['', [Validators.required, Validators.email]],
    P_region: ['', Validators.required],
    P_c: ['', Validators.required],
    P_sexe: ['', Validators.required],
    P_nbs: [0, Validators.required],
    P_n: [0, Validators.required],
    P_pt: ['', Validators.required],
    P_notes: ['']
  });

  constructor(
    private appComponent: AppComponent,
    private service: ServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appComponent.hideHeaderAndFooter = true;

  this.loadAdmin();

  this.loadPatients();
  this.loadNotifications();
  }

  loadPatients(): void {
    this.service.getpatient().subscribe((result: any) => {
      const rows = result?.data || result || [];

      this.patients = rows.sort(
        (a: any, b: any) => Number(b.P_id) - Number(a.P_id)
      );

      this.updateCounts();
      this.applyFilters();
    });
  }

  loadNotifications(): void {
    this.service.getpinterface().subscribe((result: any) => {
      this.am = (result?.data || result || []).length;
    });
  }

 updateCounts(): void {
  this.tunisCount = this.patients.filter((p: any) => p.P_region === 'Tunis').length;
  this.sousseCount = this.patients.filter((p: any) => p.P_region === 'Sousse').length;
  this.sfaxCount = this.patients.filter((p: any) => p.P_region === 'Sfax').length;
}

  formatHeaderDate(): string {
    return this.todayDate.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  applyFilters(): void {
    const q = (this.searchText || '').toLowerCase().trim();

    this.filteredPatients = this.patients.filter((p: any) => {
      const fullName = `${p.P_nom || ''} ${p.P_prenom || ''}`.toLowerCase();
      const tel = String(p.P_tel || '').toLowerCase();
      const pathologie = String(p.P_c || '').toLowerCase();
      const email = String(p.P_email || '').toLowerCase();
      const notes = String(p.P_notes || '').toLowerCase();

      const matchSearch =
        !q ||
        fullName.includes(q) ||
        tel.includes(q) ||
        pathologie.includes(q) ||
        email.includes(q) ||
        notes.includes(q);

      const matchCenter = !this.centerFilter || p.P_region === this.centerFilter;

      return matchSearch && matchCenter;
    });
  }

  resetFilters(): void {
    this.searchText = '';
    this.centerFilter = '';
    this.applyFilters();
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.selectedPatient = null;

    this.patientForm.reset({
      P_id: null,
      P_nom: '',
      P_prenom: '',
      P_tel: '',
      P_email: 'unknown@gmail.com',
      P_region: '',
      P_c: '',
      P_sexe: '',
      P_nbs: 0,
      P_n: 0,
      P_pt: '',
      P_notes: ''
    });

    this.showFormModal = true;
  }

  openEditModal(patient: any): void {
    this.isEditMode = true;
    this.selectedPatient = patient;

    this.patientForm.patchValue({
      P_id: patient.P_id,
      P_nom: patient.P_nom || '',
      P_prenom: patient.P_prenom || '',
      P_tel: patient.P_tel || '',
      P_email: patient.P_email || '',
      P_region: patient.P_region || '',
      P_c: patient.P_c || '',
      P_sexe: patient.P_sexe || '',
      P_nbs: patient.P_nbs || 0,
      P_n: patient.P_n || 0,
      P_pt: patient.P_pt || '',
      P_notes: patient.P_notes || ''
    });

    this.showFormModal = true;
  }

  closeFormModal(): void {
    this.showFormModal = false;
  }

  openDetailsModal(patient: Patient): void {
    this.selectedPatient = patient;
    this.showDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
  }

  savePatient(): void {
    if (this.patientForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const phone = String(this.patientForm.value.P_tel || '');

    if (phone.length > 8) {
      alert('Veuillez saisir un numéro de téléphone valide (8 chiffres maximum).');
      return;
    }

    const payload: any = this.patientForm.value;

    if (this.isEditMode) {
      this.service.editPatient(payload).subscribe({
        next: () => {
          alert('Patient modifié avec succès.');
          this.closeFormModal();
          this.loadPatients();
          this.router.navigate(['/patient']);
        },
        error: () => alert('Échec de modification.')
      });
      return;
    }

    const duplicate = this.patients.some((p: any) => String(p.P_tel) === phone);

    if (duplicate) {
      alert('Ce numéro de téléphone existe déjà.');
      return;
    }

    this.service.ajouterpatient(payload).subscribe({
      next: () => {
        alert('Patient ajouté avec succès.');
        this.closeFormModal();
        this.loadPatients();
      },
      error: () => alert('Échec ajout patient.')
    });
  }

  deletePatient(patient: Patient): void {
    if (!confirm('Voulez-vous vraiment supprimer ce patient ?')) return;

    this.service.DeletePatient((patient as any).P_id).subscribe({
      next: () => {
        this.patients = this.patients.filter(
          (p: any) => p.P_id !== (patient as any).P_id
        );
        this.updateCounts();
        this.applyFilters();
      },
      error: () => alert('Suppression échouée.')
    });
  }

  loadAdmin(): void {
  this.service.getSignladmin(1).subscribe({
    next: (res: any) => {

      const admin = res?.data || {};

      this.logo = admin.logo || '';
      this.photo = admin.img || '';

      console.log('LOGO =>', this.logo);
      console.log('PHOTO =>', this.photo);
    },
    error: (err) => {
      console.log(err);
    }
  });
}
}
