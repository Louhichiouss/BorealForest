
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ServiceService } from '../model/service.service';
import { FormBuilder, Validators } from '@angular/forms';

type PeriodFilter = 'today' | 'month' | 'year' | 'all' | 'custom';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit {
  recettes: any[] = [];
  depenses: any[] = [];
  filteredRecettes: any[] = [];

  am = 0;
logo = '';
photo = '';
  searchText = '';
  centerFilter = '';
  paymentFilter = '';

  selectedPeriod: PeriodFilter = 'month';
  showCustomDates = false;
  customStart = '';
  customEnd = '';

  selectedYear = new Date().getFullYear();
  months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

  showFormModal = false;
  showDetailsModal = false;
  isEditMode = false;
  selectedRecette: any = null;

  recetteForm = this.fb.group({
    id: [null],
    recette: ['', Validators.required],
    date: ['', Validators.required],
    jour: ['', Validators.required],
    region: ['', Validators.required],
    moyen: ['Espèces'],
    statut: ['Reçu'],
    notes: ['']
  });

  constructor(
    private appcomponent: AppComponent,
    private service: ServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.appcomponent.hideHeaderAndFooter = true;

  this.loadAdmin();

  this.loadRecettes();
  this.loadDepenses();
  this.loadNotifications();

  this.selectedPeriod = 'month';
  }

  formatHeaderDate(): string {
    return new Date().toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  loadNotifications(): void {
    this.service.getpinterface().subscribe((result: any) => {
      const rows = result?.data || result || [];
      this.am = rows.length || 0;
    });
  }

  loadRecettes(): void {
    this.service.getrecette().subscribe((result: any) => {
      const rows = result?.data || result || [];
      this.recettes = rows
        .map((r: any) => this.normalizeRecette(r))
        .sort((a: any, b: any) => {
          return String(b.date || '').localeCompare(String(a.date || '')) || Number(b.id || 0) - Number(a.id || 0);
        });

      this.applyFilters();
    });
  }

  loadDepenses(): void {
    this.service.getdepense().subscribe((result: any) => {
      const rows = result?.data || result || [];
      this.depenses = rows.map((d: any) => this.normalizeDepense(d));
    });
  }

  normalizeRecette(r: any): any {
    const amount = this.toNumber(r.recette ?? r.Recette ?? r.amount ?? r.montant ?? 0);
    return {
      ...r,
      id: r.id,
      num: r.num || r.numero || `REC-${String(r.id || '').padStart(3, '0')}`,
      amount,
      recette: amount,
      date: r.date || r.Date || '',
      jour: r.jour || r.Jour || '',
      region: r.region || r.Region || r.centre || r.center || 'Tunis',
      moyen: r.moyen || r.mode || r.payment || 'Espèces',
      statut: r.statut || r.status || 'Reçu',
      notes: r.notes || '—'
    };
  }

  normalizeDepense(d: any): any {
    return {
      ...d,
      amount: this.toNumber(d.depense ?? d.Depense ?? d.amount ?? d.montant ?? 0),
      date: d.date || d.Date || '',
      region: d.region || d.Region || d.centre || d.center || 'Tunis'
    };
  }

  toNumber(value: any): number {
    if (value === null || value === undefined) return 0;
    const n = Number(String(value).replace(',', '.').replace(/[^\d.-]/g, ''));
    return Number.isFinite(n) ? n : 0;
  }

  formatMoney(value: any): string {
    return this.toNumber(value).toFixed(3);
  }

  setPeriod(period: PeriodFilter): void {
    this.selectedPeriod = period;
    if (period !== 'custom') {
      this.showCustomDates = false;
    }
    this.applyFilters();
  }

  toggleCustomFilter(): void {
    if (this.selectedPeriod === 'custom' && this.showCustomDates) {
      this.showCustomDates = false;
      return;
    }

    this.selectedPeriod = 'custom';
    this.showCustomDates = true;
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

    if (this.selectedPeriod === 'today') {
      return d.toISOString().split('T')[0] === today.toISOString().split('T')[0];
    }

    if (this.selectedPeriod === 'month') {
      return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth();
    }

    if (this.selectedPeriod === 'year') {
      return d.getFullYear() === today.getFullYear();
    }

    if (this.selectedPeriod === 'custom') {
      if (!this.customStart || !this.customEnd) return true;
      return d >= new Date(this.customStart) && d <= new Date(this.customEnd);
    }

    return true;
  }

  applyFilters(): void {
    const q = (this.searchText || '').toLowerCase().trim();

    this.filteredRecettes = this.recettes.filter((r: any) => {
      const matchSearch =
        !q ||
        String(r.num || '').toLowerCase().includes(q) ||
        String(r.amount || '').toLowerCase().includes(q) ||
        String(r.region || '').toLowerCase().includes(q) ||
        String(r.date || '').toLowerCase().includes(q) ||
        String(r.jour || '').toLowerCase().includes(q) ||
        String(r.moyen || '').toLowerCase().includes(q);

      const matchCenter = !this.centerFilter || r.region === this.centerFilter;
      const matchPayment = !this.paymentFilter || r.moyen === this.paymentFilter;
      const matchPeriod = this.isInPeriod(r.date);

      return matchSearch && matchCenter && matchPayment && matchPeriod;
    });
  }

  resetFilters(): void {
    this.searchText = '';
    this.centerFilter = '';
    this.paymentFilter = '';
    this.selectedPeriod = 'all';
    this.showCustomDates = false;
    this.customStart = '';
    this.customEnd = '';
    this.applyFilters();
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.selectedRecette = null;
    const today = new Date().toISOString().split('T')[0];

    this.recetteForm.reset({
      id: null,
      recette: '',
      date: today,
      jour: this.getFrenchDay(today),
      region: 'Tunis',
      moyen: 'Espèces',
      statut: 'Reçu',
      notes: ''
    });

    this.showFormModal = true;
  }

  openEditModal(recette: any): void {
    this.isEditMode = true;
    this.selectedRecette = recette;

    this.recetteForm.patchValue({
      id: recette.id,
      recette: recette.amount,
      date: recette.date,
      jour: recette.jour,
      region: recette.region,
      moyen: recette.moyen,
      statut: recette.statut,
      notes: recette.notes
    });

    this.showFormModal = true;
  }

openDetailsModal(recette: any): void {
  this.selectedRecette = recette;
  this.showDetailsModal = true;
}





  closeFormModal(): void {
    this.showFormModal = false;
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
  }

  onDateChange(): void {
    const date = this.recetteForm.value.date;
    if (date) this.recetteForm.patchValue({ jour: this.getFrenchDay(date) });
  }

  saveRecette(): void {
    if (this.recetteForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

   const payload: any = {
  id: this.recetteForm.value.id,
  recette: this.recetteForm.value.recette,
  date: this.recetteForm.value.date,
  jour: this.recetteForm.value.jour,
  region: this.recetteForm.value.region,
  moyen: this.recetteForm.value.moyen,
  statut: this.recetteForm.value.statut,
  notes: this.recetteForm.value.notes
};
    if (this.isEditMode) {
      this.service.editrecette(payload).subscribe({
        next: () => {
          alert('Recette modifiée avec succès.');
          this.closeFormModal();
          this.loadRecettes();
        },
        error: () => alert('Erreur modification recette.')
      });
      return;
    }

    this.service.ajouterrecette(payload).subscribe({
      next: () => {
        alert('Recette ajoutée avec succès.');
        this.closeFormModal();
        this.loadRecettes();
      },
      error: () => alert('Erreur ajout recette.')
    });
  }

  deleteRecette(recette: any): void {
    if (!confirm('Voulez-vous vraiment supprimer cette recette ?')) return;

    this.service.Deleterecette(recette.id).subscribe({
      next: () => {
        this.recettes = this.recettes.filter((r: any) => r.id !== recette.id);
        this.applyFilters();
      },
      error: () => alert('Suppression échouée.')
    });
  }

  getFrenchDay(dateValue: string): string {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const d = new Date(dateValue);
    if (Number.isNaN(d.getTime())) return '';
    return days[d.getDay()];
  }

  totalByCenter(center: string): number {
    return this.filteredRecettes
      .filter((r: any) => r.region === center)
      .reduce((sum: number, r: any) => sum + this.toNumber(r.amount), 0);
  }

  totalDepenseByCenter(center: string): number {
    return this.depenses
      .filter((d: any) => d.region === center && this.isInPeriod(d.date))
      .reduce((sum: number, d: any) => sum + this.toNumber(d.amount), 0);
  }

  get totalRecettes(): number {
    return this.filteredRecettes.reduce((sum: number, r: any) => sum + this.toNumber(r.amount), 0);
  }

  get totalDepenses(): number {
    return this.depenses
      .filter((d: any) => this.isInPeriod(d.date))
      .reduce((sum: number, d: any) => sum + this.toNumber(d.amount), 0);
  }

  get netProfit(): number {
    return this.totalRecettes - this.totalDepenses;
  }

  monthlyRevenue(monthIndex: number): number {
    return this.recettes
      .filter((r: any) => {
        const d = new Date(r.date);
        return !Number.isNaN(d.getTime()) &&
          d.getFullYear() === Number(this.selectedYear) &&
          d.getMonth() === monthIndex;
      })
      .reduce((sum: number, r: any) => sum + this.toNumber(r.amount), 0);
  }

  monthlyExpense(monthIndex: number): number {
    return this.depenses
      .filter((d: any) => {
        const dt = new Date(d.date);
        return !Number.isNaN(dt.getTime()) &&
          dt.getFullYear() === Number(this.selectedYear) &&
          dt.getMonth() === monthIndex;
      })
      .reduce((sum: number, d: any) => sum + this.toNumber(d.amount), 0);
  }

  maxMonthly(): number {
    const values = this.months.flatMap((_, i) => [this.monthlyRevenue(i), this.monthlyExpense(i)]);
    return Math.max(...values, 100);
  }

  revenueBarHeight(i: number): number {
    const v = this.monthlyRevenue(i);
    return v <= 0 ? 4 : Math.max(8, (v / this.maxMonthly()) * 170);
  }

  expenseBarHeight(i: number): number {
    const v = this.monthlyExpense(i);
    return v <= 0 ? 4 : Math.max(8, (v / this.maxMonthly()) * 170);
  }

  centerBarHeight(center: string): number {
    const max = Math.max(this.totalByCenter('Tunis'), this.totalByCenter('Sousse'), this.totalByCenter('Sfax'), 100);
    const v = this.totalByCenter(center);
    return v <= 0 ? 4 : Math.max(10, (v / max) * 180);
  }

  getCenterClass(region: string): string {
    return 'badge-' + String(region || 'tunis').toLowerCase();
  }





patientCountByCenter(center: string): number {
  if (center === 'Tunis') return 318;
  if (center === 'Sousse') return 42;
  if (center === 'Sfax') return 26;
  return 0;
}

monthlyCenterHeight(center: string, monthIndex: number): number {
  const total = this.recettes
    .filter((r: any) => {
      const d = new Date(r.date);
      return !Number.isNaN(d.getTime()) &&
        d.getFullYear() === Number(this.selectedYear) &&
        d.getMonth() === monthIndex &&
        r.region === center;
    })
    .reduce((sum: number, r: any) => sum + this.toNumber(r.amount), 0);

  const max = Math.max(
    ...['Tunis', 'Sousse', 'Sfax'].flatMap((c: string) =>
      this.months.map((_: any, i: number) =>
        this.recettes
          .filter((r: any) => {
            const d = new Date(r.date);
            return !Number.isNaN(d.getTime()) &&
              d.getFullYear() === Number(this.selectedYear) &&
              d.getMonth() === i &&
              r.region === c;
          })
          .reduce((sum: number, r: any) => sum + this.toNumber(r.amount), 0)
      )
    ),
    1
  );

  return total <= 0 ? 4 : Math.max(6, (total / max) * 180);
}

monthlyCenterTotal(center: string, monthIndex: number): number {
  return this.recettes
    .filter((r: any) => {
      const d = new Date(r.date);

      return (
        !isNaN(d.getTime()) &&
        d.getFullYear() === Number(this.selectedYear) &&
        d.getMonth() === monthIndex &&
        r.region === center
      );
    })
    .reduce((sum: number, r: any) => {
      return sum + Number(r.recette || r.amount || 0);
    }, 0);
}
tooltip = {
  visible:false,
  x:0,
  y:0,
  center:'',
  month:'',
  amount:0
};

showTooltip(
  event:any,
  center:string,
  month:string,
  amount:number
){
  this.tooltip = {
    visible:true,
    x:event.pageX + 10,
    y:event.pageY - 60,
    center:center,
    month:month,
    amount:amount
  };
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

showChartTooltip(
  event: MouseEvent,
  month: string,
  center: string,
  amount: number,
  color: string
): void {
  this.chartTooltip = {
    visible: true,
    x: event.clientX + 15,
    y: event.clientY - 50,
    month,
    center,
    amount,
    color
  };
}

hideChartTooltip(): void {
  this.chartTooltip.visible = false;
}

paymentTotal(moyen: string): number {
  return this.filteredRecettes
    .filter((r: any) => r.moyen === moyen)
    .reduce((sum: number, r: any) => sum + this.toNumber(r.amount), 0);
}
totalByCenterStatus(center: string, statut: string): number {
  return this.filteredRecettes
    .filter((r: any) =>
      r.region === center &&
      String(r.statut || '').trim() === statut
    )
    .reduce((sum: number, r: any) => sum + this.toNumber(r.amount), 0);
}
paymentDonutGradient(): string {
  const items = [
    { name: 'Espèces', color: '#1A8FA0' },
    { name: 'Virement', color: '#7C3AED' },
    { name: 'Carte', color: '#0284C7' },
    { name: 'Chèque', color: '#D97706' }
  ];

  const total = items.reduce((sum, item) => sum + this.paymentTotal(item.name), 0);

  if (total <= 0) {
    return 'conic-gradient(#E5E7EB 0 100%)';
  }

  let start = 0;

  const parts = items
    .filter(item => this.paymentTotal(item.name) > 0)
    .map(item => {
      const value = this.paymentTotal(item.name);
      const end = start + (value / total) * 100;
      const part = `${item.color} ${start}% ${end}%`;
      start = end;
      return part;
    });

  return `conic-gradient(${parts.join(', ')})`;
}
loadAdmin(): void {
  this.service.getSignladmin(1).subscribe({
    next: (res: any) => {

      const admin = res?.data || {};

      this.logo = admin.logo || '';
      this.photo = admin.img || '';

      console.log('RECETTE LOGO:', this.logo);
      console.log('RECETTE PHOTO:', this.photo);
    },
    error: (err) => console.log(err)
  });
}
}
