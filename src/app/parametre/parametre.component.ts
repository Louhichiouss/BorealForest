import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ServiceService } from '../model/service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { admin } from '../model/user';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit {
  addForm: FormGroup;
  passwordForm: FormGroup;

  admin: admin[] = [];
  admin_id: any = 1;
  am: any = 0;

  selectedPhoto: File | null = null;
  selectedLogo: File | null = null;

  previewPhoto = '';
  previewLogo = '';

  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  currentDate = '';

  constructor(
    private appcomponent: AppComponent,
    private service: ServiceService,
    private formbuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.addForm = this.formbuilder.group({
      id: [],
      nom: ['', Validators.required],
      prenom: [''],
      tel: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      img: [null],
      logo: [null]
    });

    this.passwordForm = this.formbuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.appcomponent.hideHeaderAndFooter = true;
    this.setCurrentDate();
    this.loadAdmin();
    this.loadNotifications();
  }

  setCurrentDate(): void {
    const today = new Date();

    const jours = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
    const mois = [
      'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
      'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'
    ];

    this.currentDate =
      `${jours[today.getDay()]} ${today.getDate()} ${mois[today.getMonth()]} ${today.getFullYear()}`;
  }

  loadAdmin(): void {
    this.service.getSignladmin(this.admin_id).subscribe({
      next: (res: any) => {
        const adminData = res?.data || res || {};

        this.addForm.patchValue(adminData);

        this.previewLogo = adminData.logo || '';
        this.previewPhoto = adminData.img || '';

        this.cdr.detectChanges();
      },
      error: () => console.log('Erreur chargement admin')
    });
  }

  loadNotifications(): void {
    this.service.getpinterface().subscribe({
      next: (result: any) => {
        const rows = result?.data || result || [];
        this.am = rows.length || 0;
      },
      error: () => {
        this.am = 0;
      }
    });
  }

  uploadPhoto(event: any): void {
    const file = event.target.files?.[0];
    if (!file) return;

    this.selectedPhoto = file;
    this.addForm.patchValue({ img: file });
    this.addForm.get('img')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.previewPhoto = String(reader.result);
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  uploadLogo(event: any): void {
    const file = event.target.files?.[0];
    if (!file) return;

    this.selectedLogo = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewLogo = String(reader.result);
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);

    this.service.logoUpload(file).subscribe({
      next: () => this.loadAdmin(),
      error: () => alert('Erreur upload logo.')
    });
  }

  saveProfile(): void {
    const data = {
      id: this.addForm.value.id,
      nom: this.addForm.value.nom,
      prenom: this.addForm.value.prenom,
      tel: this.addForm.value.tel,
      email: this.addForm.value.email,
      password: this.addForm.value.password
    };

    this.service.editadmin(data as any).subscribe({
      next: () => {
        if (this.selectedPhoto) {
          this.service.adminPhotoUpload(this.selectedPhoto).subscribe({
            next: () => this.loadAdmin(),
            error: () => alert('Erreur upload photo.')
          });
        }

        alert('Profil mis à jour avec succès.');
        this.cdr.detectChanges();
      },
      error: () => alert('Erreur modification profil.')
    });
  }

  updatePassword(): void {
    if (this.passwordForm.invalid) {
      alert('Veuillez remplir tous les champs du mot de passe.');
      return;
    }

    if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmPassword) {
      alert('Le nouveau mot de passe et la confirmation ne correspondent pas.');
      return;
    }

    const data = {
      id: this.addForm.value.id,
      nom: this.addForm.value.nom,
      prenom: this.addForm.value.prenom,
      tel: this.addForm.value.tel,
      email: this.addForm.value.email,
      password: this.passwordForm.value.newPassword
    };

    this.service.editadmin(data as any).subscribe({
      next: () => {
        alert('Mot de passe mis à jour avec succès.');
        this.passwordForm.reset();
        this.loadAdmin();
      },
      error: () => alert('Erreur modification mot de passe.')
    });
  }

  removeLogo(): void {
    this.service.deleteLogo().subscribe({
      next: () => {
        this.previewLogo = '';
        this.selectedLogo = null;
        this.addForm.patchValue({ logo: null });
        alert('Logo supprimé avec succès.');
        this.loadAdmin();
      },
      error: () => alert('Erreur suppression logo.')
    });
  }
}
