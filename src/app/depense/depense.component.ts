import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ServiceService } from '../model/service.service';
import { FormBuilder, Validators } from '@angular/forms';

type PeriodFilter = 'today' | 'month' | 'year' | 'all' | 'custom';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {
  depenses: any[] = [];
  filteredDepenses: any[] = [];

  logo = '';
photo = '';

  am = 0;
  searchText = '';
  centerFilter = '';
  typeFilter = '';

  selectedPeriod: PeriodFilter = 'month';
  showCustomDates = false;
  customStart = '';
  customEnd = '';

  showFormModal = false;
  showDetailsModal = false;
  isEditMode = false;
  selectedDepense: any = null;

  selectedDepenseFile: File | null = null;

  depenseForm = this.fb.group({
    id: [null],
    depense: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    jour: ['', Validators.required],
    region: ['', Validators.required],
    type: ['Autre'],
    statut: ['Payé'],
    scan: [''],
    fournisseur: [''],
    numero_facture: ['']
  });

  constructor(
    private appcomponent: AppComponent,
    private service: ServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
     this.appcomponent.hideHeaderAndFooter = true;

  this.loadAdmin();

  this.loadDepenses();
  this.loadNotifications();

  this.selectedPeriod = 'month';
  }

  loadNotifications(): void {
    this.service.getpinterface().subscribe((result: any) => {
      const rows = result?.data || result || [];
      this.am = rows.length || 0;
    });
  }

  loadDepenses(): void {
    this.service.getdepense().subscribe((result: any) => {
      const rows = result?.data || result || [];
      this.depenses = rows.map((d: any) => this.normalizeDepense(d));
      this.applyFilters();
    });
  }
centers = ['Tunis', 'Sousse', 'Sfax'];

expenseTypes = [
  { name: 'STEG', color: '#7C3AED' },
  { name: 'SONEDE', color: '#0284C7' },
  { name: 'Marketing', color: '#16A34A' },
  { name: 'Car fuel / Transport', color: '#D97706' },
  { name: 'Autre', color: '#DC2626' }
];

donutGradient(): string {
  const total = this.totalDepenses || 1;
  let start = 0;

  const parts = this.expenseTypes.map(t => {
    const value = this.totalByType(t.name);
    const percent = (value / total) * 100;
    const end = start + percent;
    const segment = `${t.color} ${start}% ${end}%`;
    start = end;
    return segment;
  });

  return `conic-gradient(${parts.join(', ')})`;
}
  normalizeDepense(d: any): any {
    const amount = this.toNumber(d.depense ?? d.amount ?? 0);
    const description = d.description || '—';

    return {
      ...d,
      id: d.id,
      num: d.numero_facture || `EXP-${d.date ? String(d.date).slice(0, 4) : new Date().getFullYear()}-${String(d.id || '').padStart(3, '0')}`,
      amount,
      depense: amount,
      description,
      fournisseur: d.fournisseur || description,
      date: d.date || '',
      jour: d.jour || '',
      region: d.region || 'Tunis',
      type: d.type_depense || this.guessType(description),
      statut: d.statut || 'Payé',
      scan: d.fichier || '—'
    };
  }

  onDepenseFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) this.selectedDepenseFile = file;
  }

  saveDepense(): void {
    if (this.depenseForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const saveData = (filePath: string | null = null) => {
      const payload: any = {
        id: this.depenseForm.value.id,
        depense: this.depenseForm.value.depense,
        description: this.depenseForm.value.description,
        date: this.depenseForm.value.date,
        jour: this.depenseForm.value.jour,
        region: this.depenseForm.value.region,
        fournisseur: this.depenseForm.value.fournisseur,
        numero_facture: this.depenseForm.value.numero_facture,
        type_depense: this.depenseForm.value.type,
        statut: this.depenseForm.value.statut,
        fichier: filePath || this.depenseForm.value.scan
      };

      const request = this.isEditMode
        ? this.service.editdepense(payload)
        : this.service.ajouterdepense(payload);

      request.subscribe({
        next: () => {
          alert(this.isEditMode ? 'Dépense modifiée avec succès.' : 'Dépense ajoutée avec succès.');
          this.selectedDepenseFile = null;
          this.closeFormModal();
          this.loadDepenses();
        },
        error: () => alert('Erreur sauvegarde dépense.')
      });
    };

    if (this.selectedDepenseFile) {
      this.service.uploadDepenseFile(this.selectedDepenseFile).subscribe((res: any) => {
        if (res.success) saveData(res.path);
        else alert(res.message || 'Upload failed');
      });
    } else {
      saveData();
    }
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.selectedDepense = null;
    this.selectedDepenseFile = null;

    const today = new Date().toISOString().split('T')[0];

    this.depenseForm.reset({
      id: null,
      depense: '',
      description: '',
      date: today,
      jour: this.getFrenchDay(today),
      region: 'Tunis',
      type: 'Autre',
      statut: 'Payé',
      scan: '',
      fournisseur: '',
      numero_facture: ''
    });

    this.showFormModal = true;
  }

  openEditModal(depense: any): void {
    this.isEditMode = true;
    this.selectedDepense = depense;
    this.selectedDepenseFile = null;

    this.depenseForm.patchValue({
      id: depense.id,
      depense: depense.amount,
      description: depense.description,
      date: depense.date,
      jour: depense.jour,
      region: depense.region,
      type: depense.type,
      statut: depense.statut,
      scan: depense.scan,
      fournisseur: depense.fournisseur,
      numero_facture: depense.num
    });

    this.showFormModal = true;
  }

  deleteDepense(depense: any): void {
    if (!confirm('Voulez-vous vraiment supprimer cette dépense ?')) return;

    this.service.Deletedepense(depense.id).subscribe({
      next: () => {
        this.depenses = this.depenses.filter((d: any) => d.id !== depense.id);
        this.applyFilters();
      },
      error: () => alert('Suppression échouée.')
    });
  }

  downloadScan(dep: any): void {
    if (!dep.scan || dep.scan === '—') return;
    const filename = String(dep.scan).split('/').pop();
    window.open('https://server.oxyboreal.com/api/downloadDepenseFile.php?file=' + filename, '_blank');
  }

  openDetailsModal(depense: any): void {
    this.selectedDepense = depense;
    this.showDetailsModal = true;
  }

  closeFormModal(): void {
    this.showFormModal = false;
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
  }

  onDateChange(): void {
    const date = this.depenseForm.value.date;
    if (date) this.depenseForm.patchValue({ jour: this.getFrenchDay(date) });
  }

  applyFilters(): void {
    const q = (this.searchText || '').toLowerCase().trim();

    this.filteredDepenses = this.depenses.filter((d: any) => {
      const matchSearch =
        !q ||
        String(d.num || '').toLowerCase().includes(q) ||
        String(d.amount || '').toLowerCase().includes(q) ||
        String(d.region || '').toLowerCase().includes(q) ||
        String(d.description || '').toLowerCase().includes(q) ||
        String(d.type || '').toLowerCase().includes(q) ||
        String(d.date || '').toLowerCase().includes(q);

      return matchSearch &&
        (!this.centerFilter || d.region === this.centerFilter) &&
        (!this.typeFilter || d.type === this.typeFilter) &&
        this.isInPeriod(d.date);
    });
  }

  setPeriod(period: PeriodFilter): void {
    this.selectedPeriod = period;
    if (period !== 'custom') this.showCustomDates = false;
    this.applyFilters();
  }

  toggleCustomFilter(): void {
    this.selectedPeriod = 'custom';
    this.showCustomDates = !this.showCustomDates;
    this.applyFilters();
  }

  applyCustomFilter(): void {
    this.selectedPeriod = 'custom';
    this.showCustomDates = false;
    this.applyFilters();
  }

  isInPeriod(dateStr: string): boolean {
    if (!dateStr || this.selectedPeriod === 'all') return true;
    const d = new Date(dateStr);
    const today = new Date();
    if (Number.isNaN(d.getTime())) return true;

    if (this.selectedPeriod === 'today') return d.toISOString().split('T')[0] === today.toISOString().split('T')[0];
    if (this.selectedPeriod === 'month') return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth();
    if (this.selectedPeriod === 'year') return d.getFullYear() === today.getFullYear();
    if (this.selectedPeriod === 'custom') {
      if (!this.customStart || !this.customEnd) return true;
      return d >= new Date(this.customStart) && d <= new Date(this.customEnd);
    }
    return true;
  }

  guessType(text: string): string {
    const t = String(text || '').toLowerCase();
    if (t.includes('steg')) return 'STEG';
    if (t.includes('sonede')) return 'SONEDE';
    if (t.includes('marketing') || t.includes('pub') || t.includes('ads')) return 'Marketing';
    if (t.includes('fuel') || t.includes('transport') || t.includes('essence')) return 'Car fuel / Transport';
    return 'Autre';
  }

  toNumber(value: any): number {
    const n = Number(String(value ?? 0).replace(',', '.').replace(/[^\d.-]/g, ''));
    return Number.isFinite(n) ? n : 0;
  }

  formatMoney(value: any): string {
    return this.toNumber(value).toFixed(3);
  }

  formatHeaderDate(): string {
    return new Date().toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  getFrenchDay(dateValue: string): string {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const d = new Date(dateValue);
    return Number.isNaN(d.getTime()) ? '' : days[d.getDay()];
  }

  totalByCenter(center: string): number {
    return this.filteredDepenses.filter((d: any) => d.region === center).reduce((sum, d) => sum + this.toNumber(d.amount), 0);
  }

  get totalDepenses(): number {
    return this.filteredDepenses.reduce((sum, d) => sum + this.toNumber(d.amount), 0);
  }

  totalByType(type: string): number {
    return this.filteredDepenses.filter((d: any) => d.type === type).reduce((sum, d) => sum + this.toNumber(d.amount), 0);
  }

centerBarHeight(center: string): number {
  const value = this.totalByCenter(center);

  const max = Math.max(
    this.totalByCenter('Tunis'),
    this.totalByCenter('Sousse'),
    this.totalByCenter('Sfax'),
    1
  );

  return value <= 0 ? 4 : Math.max(10, (value / max) * 220);
}
  getCenterClass(region: string): string {
    return 'badge-' + String(region || 'tunis').toLowerCase();
  }

  getTypeClass(type: string): string {
    return 'type-' + String(type || 'autre').toLowerCase().replaceAll(' ', '-').replaceAll('/', '-');
  }

  getStatusClass(statut: string): string {
  const s = String(statut || 'Payé').toLowerCase();

  if (s === 'impayé' || s === 'impaye' || s === 'unpaid') {
    return 'status-unpaid';
  }

  if (s === 'partial' || s === 'partiel' || s === 'partiellement payé') {
    return 'status-partial';
  }

  return 'status-paid';
}

totalByCenterAndStatus(center: string, statut: string): number {
  return this.filteredDepenses
    .filter((d: any) =>
      d.region === center &&
      String(d.statut || '').trim() === statut
    )
    .reduce((sum, d) => sum + this.toNumber(d.amount), 0);
}
chartTooltip = {
  visible: false,
  x: 0,
  y: 0,
  month: '',
  center: '',
  amount: 0,
  color: ''
};

showChartTooltip(event: MouseEvent, month: string, center: string, amount: number, color: string): void {
  this.chartTooltip = {
    visible: true,
    x: event.clientX + 12,
    y: event.clientY - 55,
    month,
    center,
    amount,
    color
  };
}

hideChartTooltip(): void {
  this.chartTooltip.visible = false;
}

monthlyExpense(center: string, monthIndex: number): number {
  return this.filteredDepenses
    .filter((d: any) => {
      const date = new Date(d.date);
      return d.region === center && date.getMonth() === monthIndex;
    })
    .reduce((sum: number, d: any) => sum + this.toNumber(d.amount), 0);
}
months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

monthlyExpenseHeight(center: string, monthIndex: number): number {

  const value = this.monthlyExpense(center, monthIndex);

  const max = Math.max(
    ...this.months.flatMap((m, i) => [
      this.monthlyExpense('Tunis', i),
      this.monthlyExpense('Sousse', i),
      this.monthlyExpense('Sfax', i)
    ]),
    1
  );

  return value <= 0 ? 4 : Math.max(8, (value / max) * 220);
}
loadAdmin(): void {
  this.service.getSignladmin(1).subscribe({
    next: (res: any) => {

      const admin = res?.data || {};

      this.logo = admin.logo || '';
      this.photo = admin.img || '';

      console.log('FACTURE LOGO:', this.logo);
      console.log('FACTURE PHOTO:', this.photo);
    },
    error: (err) => console.log(err)
  });
}
}
