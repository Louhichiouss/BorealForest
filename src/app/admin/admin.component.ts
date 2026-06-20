import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ServiceService } from '../model/service.service';

type PeriodFilter = 'today' | 'month' | 'year' | 'all' | 'custom';
type CenterFilter = '' | 'Tunis' | 'Sousse' | 'Sfax';
type RdvStatus = 'Confirmé' | 'En attente' | 'Terminé' | 'Annulé';

interface TopPatient {
  rank: number;
  initials: string;
  name: string;
  center: string;
  sessions: number;
  amount: number;
  color: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  patients: any[] = [];
  recettes: any[] = [];
  depenses: any[] = [];
  events: any[] = [];
  factures: any[] = [];
  alerts: any[] = [];

  logo = '';
  photo = '';

  am = 0;
  alertsCount = 0;

  unpaidFacturesCount = 0;
  pendingTodayRdvCount = 0;
  newPatientsCount = 0;
marketingAlertsCount = 0;
  selectedPeriod: PeriodFilter = 'today';
  selectedCenter: CenterFilter = '';
  selectedYear = new Date().getFullYear();
  selectedMonthIndex = new Date().getMonth();

  customStart = '';
  customEnd = '';
  showCustomDates = false;
  showAlertBanner = true;

  months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

  constructor(
    private appcomponent: AppComponent,
    private service: ServiceService
  ) {}

  ngOnInit(): void {
    this.appcomponent.hideHeaderAndFooter = true;
    this.loadAdminInfo();
    this.loadAll();
  }

  loadAll(): void {
    this.service.getAdminDashboard().subscribe({
      next: (res: any) => {
        if (!res || Number(res.success) === 0) {
          this.useEmptyData();
          return;
        }

        this.patients = res.patients || [];
        this.recettes = (res.recettes || []).map((r: any) => this.normalizeRecette(r));
        this.depenses = (res.depenses || []).map((d: any) => this.normalizeDepense(d));
        this.events = res.events || [];
        this.factures = res.factures || [];
        this.alerts = res.alerts || [];

        this.unpaidFacturesCount = Number(res.unpaid_factures_count || 0);
        this.pendingTodayRdvCount = Number(res.pending_rdv_today_count || 0);
        this.newPatientsCount = Number(res.new_patients_count || 0);
        this.alertsCount = Number(res.alerts_count || this.alerts.length || 0);
        this.marketingAlertsCount = Number(res.marketing_alerts_count || 0);

this.am =
  this.totalAppointments +
  this.newPatientsCount +
  this.marketingAlertsCount +
  this.unpaidFacturesCount;
        this.showAlertBanner = true;
      },
      error: (err: any) => {
        console.error('DASHBOARD ERROR:', err);
        this.useEmptyData();
      }
    });
  }

  useEmptyData(): void {
    this.patients = [];
    this.recettes = [];
    this.depenses = [];
    this.events = [];
    this.factures = [];
    this.alerts = [];
    this.am = 0;
    this.showAlertBanner = true;
  }

  todayISO(): string {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  }

  isToday(dateValue: any): boolean {
    if (!dateValue) return false;
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return false;

    const today = new Date();
    return d.getFullYear() === today.getFullYear()
      && d.getMonth() === today.getMonth()
      && d.getDate() === today.getDate();
  }

  normalizeRecette(r: any): any {
    const amount = this.toNumber(
      r.recette ?? r.Recette ?? r.amount ?? r.montant ?? r.total ?? r.prix ?? 0
    );

    return {
      ...r,
      amount,
      date: r.date || r.Date || r.created_at || '',
      region: r.region || r.Region || r.centre || r.center || 'Tunis'
    };
  }

  normalizeDepense(d: any): any {
    return {
      ...d,
      amount: this.toNumber(d.depense ?? d.Depense ?? d.amount ?? d.montant ?? d.total ?? 0),
      date: d.date || d.Date || d.created_at || '',
      region: d.region || d.Region || d.centre || d.center || 'Tunis'
    };
  }

  toNumber(value: any): number {
    const n = Number(String(value ?? 0).replace(',', '.').replace(/[^\d.-]/g, ''));
    return Number.isFinite(n) ? n : 0;
  }

  formatMoney(value: any): string {
    const n = this.toNumber(value);
    return Number.isInteger(n) ? String(n) : n.toFixed(3);
  }

  formatHeaderDate(): string {
    return new Date().toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  get todayAgendaLabel(): string {
    return new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  setPeriod(period: PeriodFilter): void {
    this.selectedPeriod = period;
    if (period !== 'custom') this.showCustomDates = false;
  }

  toggleCustomPeriod(): void {
    this.selectedPeriod = 'custom';
    this.showCustomDates = !this.showCustomDates;
  }

  applyCustomPeriod(): void {
    this.selectedPeriod = 'custom';
    this.showCustomDates = false;
  }

  setCenter(center: CenterFilter): void {
    this.selectedCenter = center;
  }

  closeAlerts(): void {
    this.showAlertBanner = false;
  }

  isSamePeriod(dateStr: string): boolean {
    if (!dateStr || this.selectedPeriod === 'all') return true;

    const d = new Date(dateStr);
    const today = new Date();
    if (Number.isNaN(d.getTime())) return true;

    const day1 = d.toISOString().split('T')[0];
    const day2 = today.toISOString().split('T')[0];

    if (this.selectedPeriod === 'today') return day1 === day2;
    if (this.selectedPeriod === 'month') return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth();
    if (this.selectedPeriod === 'year') return d.getFullYear() === today.getFullYear();

    if (this.selectedPeriod === 'custom') {
      if (!this.customStart || !this.customEnd) return true;
      const start = new Date(this.customStart);
      const end = new Date(this.customEnd);
      end.setHours(23, 59, 59, 999);
      return d >= start && d <= end;
    }

    return true;
  }

  eventCenter(event: any): string {
    const text = String(event?.text || '').trim();

    if (text.includes(':')) return text.split(':')[0].trim();
    if (text.includes('Tunis')) return 'Tunis';
    if (text.includes('Sousse')) return 'Sousse';
    if (text.includes('Sfax')) return 'Sfax';

    const phone = String(event?.patient_phone || '').trim();
    const p = this.patients.find((x: any) => String(x.P_tel || '').trim() === phone);
    return p?.P_region || '';
  }

  eventStatus(e: any): RdvStatus {
    const color = String(e.barColor || '').toLowerCase();
    if (color === '#6aa84f') return 'Terminé';
    if (color === '#cc0000') return 'Annulé';
    return 'En attente';
  }

  patientNameFromEvent(e: any): string {
    const text = String(e.text || '').trim();
    const parts = text.split(':');
    let name = parts[1]?.trim() || text;

    if (['Tunis', 'Sousse', 'Sfax'].includes(name)) {
      const phone = String(e.patient_phone || '').trim();
      const p = this.patients.find((x: any) => String(x.P_tel || '').trim() === phone);
      if (p) name = `${p.P_nom || ''} ${p.P_prenom || ''}`.trim();
    }

    return name || 'Patient';
  }

  patientSessionsByName(name: string): number {
    const cleanName = String(name || '').toLowerCase().trim();

    const found = this.patients.find((p: any) => {
      const fullName1 = `${p.P_nom || ''} ${p.P_prenom || ''}`.toLowerCase().trim();
      const fullName2 = `${p.P_prenom || ''} ${p.P_nom || ''}`.toLowerCase().trim();

      return fullName1.includes(cleanName)
        || fullName2.includes(cleanName)
        || cleanName.includes(fullName1)
        || cleanName.includes(fullName2);
    });

    return this.toNumber(found?.P_nbs || found?.seances_prevues || 0);
  }

  patientSessionsByEvent(e: any): number {
    const phone = String(e.patient_phone || '').trim();
    const byPhone = this.patients.find((p: any) => String(p.P_tel || '').trim() === phone);

    if (byPhone) return this.toNumber(byPhone.P_nbs || 0);

    return this.patientSessionsByName(this.patientNameFromEvent(e)) || this.toNumber(e.seances_prevues || 0);
  }

  rowCenter(row: any): string {
    return row.region || row.Region || row.P_region || row.center || row.centre || this.eventCenter(row) || '';
  }

  centerMatch(row: any): boolean {
    return !this.selectedCenter || this.rowCenter(row) === this.selectedCenter;
  }

  get filteredPatients(): any[] {
    return this.patients.filter((p: any) => this.centerMatch(p));
  }

  get filteredRecettes(): any[] {
    return this.recettes.filter((r: any) => this.centerMatch(r) && this.isSamePeriod(r.date));
  }

  get filteredDepenses(): any[] {
    return this.depenses.filter((d: any) => this.centerMatch(d) && this.isSamePeriod(d.date));
  }

  get todayEvents(): any[] {
    const today = this.todayISO();

    return this.events
      .filter((e: any) => {
        const sameDay = String(e.start || '').startsWith(today);
        const sameCenter = !this.selectedCenter || this.eventCenter(e) === this.selectedCenter;
        return sameDay && sameCenter;
      })
      .sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime());
  }

  get filteredAgenda(): any[] {
    return this.todayEvents.map((e: any) => {
      const date = new Date(e.start);
      const patientName = this.patientNameFromEvent(e);
      const faites = this.toNumber(e.seances_faites || 0);
      const prevues = this.patientSessionsByEvent(e);

      return {
        time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        patient: patientName,
        center: this.eventCenter(e),
        detail: `${faites}/${prevues} séances`,
        status: this.eventStatus(e)
      };
    });
  }

  get totalPatients(): number {
    return this.filteredPatients.length;
  }

  get totalAppointments(): number {
    return this.todayEvents.length;
  }

  get totalRecettes(): number {
    return this.filteredRecettes.reduce((s, r) => s + this.toNumber(r.amount), 0);
  }

  get totalDepenses(): number {
    return this.filteredDepenses.reduce((s, d) => s + this.toNumber(d.amount), 0);
  }

  get todayRevenue(): number {
    return this.recettes
      .filter((r: any) => this.centerMatch(r) && this.isToday(r.date))
      .reduce((s: number, r: any) => s + this.toNumber(r.amount), 0);
  }

  get todayExpense(): number {
    return this.depenses
      .filter((d: any) => this.centerMatch(d) && this.isToday(d.date))
      .reduce((s: number, d: any) => s + this.toNumber(d.amount), 0);
  }

  get netProfit(): number {
    return this.totalRecettes - this.totalDepenses;
  }

  get totalSessions(): number {
    return this.filteredPatients.reduce((s, p: any) => s + this.toNumber(p.P_nbs || 0), 0);
  }

  get confirmedCount(): number {
    return 0;
  }

  get pendingCount(): number {
    return this.todayEvents.filter((e: any) => this.eventStatus(e) === 'En attente').length;
  }

  get doneCount(): number {
    return this.todayEvents.filter((e: any) => this.eventStatus(e) === 'Terminé').length;
  }

  get cancelledCount(): number {
    return this.todayEvents.filter((e: any) => this.eventStatus(e) === 'Annulé').length;
  }

  statusTooltip(type: string): string {
    if (type === 'pending') return `${this.pendingCount} rendez-vous en attente aujourd'hui`;
    if (type === 'confirmed') return `${this.confirmedCount} rendez-vous confirmés aujourd'hui`;
    if (type === 'done') return `${this.doneCount} rendez-vous terminés aujourd'hui`;
    return `${this.cancelledCount} rendez-vous annulés aujourd'hui`;
  }

  centerPatientCount(center: string): number {
    return this.patients.filter((p: any) => this.rowCenter(p) === center).length;
  }

  centerRdvToday(center: string): number {
    const today = this.todayISO();
    return this.events.filter((e: any) => this.eventCenter(e) === center && String(e.start || '').startsWith(today)).length;
  }

  centerRevenue(center: string): number {
    return this.filteredRecettes.filter(r => this.rowCenter(r) === center).reduce((s, r) => s + this.toNumber(r.amount), 0);
  }

  centerExpense(center: string): number {
    return this.filteredDepenses.filter(d => this.rowCenter(d) === center).reduce((s, d) => s + this.toNumber(d.amount), 0);
  }

  fillRate(center: string): number {
    const rdv = this.centerRdvToday(center);
    return Math.min(100, Math.round((rdv / 10) * 100));
  }

  get selectedMonthName(): string {
    return this.months[this.selectedMonthIndex] || '';
  }

  centerMonthlyRevenue(center: string): number {
    return this.recettes
      .filter((r: any) => {
        const d = new Date(r.date);
        return this.rowCenter(r) === center
          && !Number.isNaN(d.getTime())
          && d.getFullYear() === Number(this.selectedYear)
          && d.getMonth() === Number(this.selectedMonthIndex);
      })
      .reduce((s, r) => s + this.toNumber(r.amount), 0);
  }

  maxCenterMonthlyRevenue(): number {
    return Math.max(this.centerMonthlyRevenue('Tunis'), this.centerMonthlyRevenue('Sousse'), this.centerMonthlyRevenue('Sfax'), 1);
  }

  centerRevenuePercent(center: string): number {
    return Math.round((this.centerMonthlyRevenue(center) / this.maxCenterMonthlyRevenue()) * 100);
  }

  monthlyRevenue(monthIndex: number): number {
    return this.recettes
      .filter((r: any) => {
        const d = new Date(r.date);
        return (!this.selectedCenter || this.rowCenter(r) === this.selectedCenter)
          && !Number.isNaN(d.getTime())
          && d.getFullYear() === Number(this.selectedYear)
          && d.getMonth() === monthIndex;
      })
      .reduce((s, r) => s + this.toNumber(r.amount), 0);
  }

  monthlyExpense(monthIndex: number): number {
    return this.depenses
      .filter((d: any) => {
        const dt = new Date(d.date);
        return (!this.selectedCenter || this.rowCenter(d) === this.selectedCenter)
          && !Number.isNaN(dt.getTime())
          && dt.getFullYear() === Number(this.selectedYear)
          && dt.getMonth() === monthIndex;
      })
      .reduce((s, d) => s + this.toNumber(d.amount), 0);
  }

  maxMonthly(): number {
    const values = this.months.flatMap((_, i) => [this.monthlyRevenue(i), this.monthlyExpense(i)]);
    return Math.max(...values, 100);
  }

  revenueBarHeight(i: number): number {
    const v = this.monthlyRevenue(i);
    return v <= 0 ? 4 : Math.max(8, (v / this.maxMonthly()) * 190);
  }

  expenseBarHeight(i: number): number {
    const v = this.monthlyExpense(i);
    return v <= 0 ? 4 : Math.max(8, (v / this.maxMonthly()) * 190);
  }

  marketingBarWidth(value: number): string {
    return `${Math.max(4, Math.min(100, value))}%`;
  }

  get topPatients(): TopPatient[] {
    const colors = ['#1A8FA0', '#7C3AED', '#A16207', '#0284C7', '#DC2626'];
    const todayNames = this.todayEvents
      .map((e: any) => this.patientNameFromEvent(e))
      .filter((name: string) => !!name && name !== 'Patient');

    const uniqueNames = Array.from(new Set(todayNames));

    return uniqueNames.slice(0, 5).map((name: string, i: number) => {
      const p = this.patients.find((x: any) => {
        const full1 = `${x.P_nom || ''} ${x.P_prenom || ''}`.toLowerCase().trim();
        const full2 = `${x.P_prenom || ''} ${x.P_nom || ''}`.toLowerCase().trim();
        const n = name.toLowerCase().trim();
        return full1.includes(n) || full2.includes(n) || n.includes(full1) || n.includes(full2);
      });

      return {
        rank: i + 1,
        initials: this.initials(name),
        name,
        center: p?.P_region || '',
        sessions: this.toNumber(p?.P_nbs || 0),
        amount: 0,
        color: colors[i] || '#1A8FA0'
      };
    });
  }

  initials(name: string): string {
    return String(name || '')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0]?.toUpperCase())
      .join('') || 'P';
  }

  get filterLabel(): string {
    const map: Record<PeriodFilter, string> = {
      today: "Aujourd'hui",
      month: 'Mois en cours',
      year: 'Année en cours',
      all: 'Tout',
      custom: 'Personnalisé'
    };

    const period = this.selectedPeriod === 'custom' && this.customStart && this.customEnd
      ? `${this.customStart} → ${this.customEnd}`
      : map[this.selectedPeriod];

    return `${period} · ${this.selectedCenter || 'Tous les centres'}`;
  }

  loadAdminInfo(): void {
    this.service.getSignladmin(1).subscribe({
      next: (res: any) => {
        let adminData = res?.data || res || {};
        if (Array.isArray(adminData)) adminData = adminData[0] || {};

        this.logo = adminData.logo || '';
        this.photo = adminData.img || adminData.photo || '';
      },
      error: (err: any) => {
        console.error('ADMIN INFO ERROR:', err);
        this.logo = '';
        this.photo = '';
      }
    });
  }

mobileMenuOpen = false;

toggleMobileMenu(): void {
  this.mobileMenuOpen = !this.mobileMenuOpen;
}

closeMobileMenu(): void {
  this.mobileMenuOpen = false;
}

  
}

