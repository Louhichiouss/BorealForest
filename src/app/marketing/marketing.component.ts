import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { ServiceService } from '../model/service.service';

type MarketingTab = 'overview' | 'roi' | 'renewals';

interface MarketingCampaign {
  id?: number | string | null;
  name: string;
  platform: string;
  centre: string;
  budget: number;
  messages_whatsapp: number;
  messages_messenger: number;
  messages_instagram: number;
  patients_booked: number;
  patients_paid: number;
  revenue: number;
  start_date: string;
  end_date: string;
  notes?: string;
}

interface MarketingReminder {
  service_name: string;
  amount: number;
  currency: string;
  renewal_type: string;
  next_payment: string;
  reminder_days: number;
}

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit {
  activeTab: MarketingTab = 'overview';

  logo = '';
  photo = '';

  campaigns: MarketingCampaign[] = [];
  reminders: MarketingReminder[] = [];
  isEditMode = false;
selectedPeriod: 'month' | 'year' | 'custom' = 'month';
customStart = '';
customEnd = '';
  marketingForm = this.fb.group({
    id: [null as number | string | null],
    name: ['', Validators.required],
    platform: ['Facebook + Instagram', Validators.required],
    centre: ['Tous', Validators.required],
    budget: [0, Validators.required],
    messages_whatsapp: [0],
    messages_messenger: [0],
    messages_instagram: [0],
    patients_booked: [0],
    patients_paid: [0],
    revenue: [0],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
    notes: ['']
  });

  constructor(
    private appcomponent: AppComponent,
    private fb: FormBuilder,
    private service: ServiceService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.appcomponent.hideHeaderAndFooter = true;
    });

    this.loadAdmin();
    this.loadCampaigns();
    this.loadReminders();
  }

  setTab(tab: MarketingTab): void {
    this.activeTab = tab;
  }

  loadCampaigns(): void {
    this.service.getMarketingCampaigns().subscribe({
      next: (res: any) => {
        const data = res?.data || res || [];
        this.campaigns = data.length ? data.map((c: any) => this.normalizeCampaign(c)) : this.demoCampaigns();
      },
      error: () => {
        this.campaigns = this.demoCampaigns();
      }
    });
  }

  loadReminders(): void {
    this.service.getMarketingReminders().subscribe({
      next: (res: any) => {
        const data = res?.data || res || [];
        this.reminders = data.length ? data : this.demoReminders();
      },
      error: () => {
        this.reminders = this.demoReminders();
      }
    });
  }

  saveCampaign(): void {
    if (this.marketingForm.invalid) {
      alert('Veuillez remplir les champs obligatoires.');
      return;
    }

    const payload = this.normalizeCampaign(this.marketingForm.value as any);

    const request = this.isEditMode
      ? this.service.updateMarketingCampaign(payload)
      : this.service.addMarketingCampaign(payload);

    request.subscribe({
      next: () => {
        alert(this.isEditMode ? 'Campagne modifiée.' : 'Campagne ajoutée.');
        this.cancelEdit();
        this.loadCampaigns();
      },
      error: () => alert('Erreur sauvegarde campagne.')
    });
  }

  editCampaign(c: MarketingCampaign): void {
    this.isEditMode = true;
    this.marketingForm.patchValue({ ...c } as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteCampaign(c: MarketingCampaign): void {
    if (!confirm('Supprimer cette campagne ?')) return;

    this.service.deleteMarketingCampaign(c.id).subscribe({
      next: () => this.loadCampaigns(),
      error: () => alert('Erreur suppression campagne.')
    });
  }

  cancelEdit(): void {
    this.isEditMode = false;

    this.marketingForm.reset({
      id: null,
      name: '',
      platform: 'Facebook + Instagram',
      centre: 'Tous',
      budget: 0,
      messages_whatsapp: 0,
      messages_messenger: 0,
      messages_instagram: 0,
      patients_booked: 0,
      patients_paid: 0,
      revenue: 0,
      start_date: '',
      end_date: '',
      notes: ''
    });
  }

  totalMessages(c: MarketingCampaign): number {
    return (
      Number(c.messages_whatsapp || 0) +
      Number(c.messages_messenger || 0) +
      Number(c.messages_instagram || 0)
    );
  }

campaignRevenue(c: MarketingCampaign): number {
  return Number(c.patients_paid || 0);
}

profit(c: MarketingCampaign): number {
  return this.campaignRevenue(c) - Number(c.budget || 0);
}
  costPerMessage(c: MarketingCampaign): number {
    return this.totalMessages(c)
      ? Number(c.budget || 0) / this.totalMessages(c)
      : 0;
  }

  costPerBooked(c: MarketingCampaign): number {
    return Number(c.patients_booked || 0)
      ? Number(c.budget || 0) / Number(c.patients_booked || 0)
      : 0;
  }

  roiPercent(c: MarketingCampaign): number {
    return Number(c.budget || 0)
      ? (this.profit(c) / Number(c.budget || 0)) * 100
      : 0;
  }

  get totalBudget(): number {
    return this.filteredCampaigns.reduce((s, c) => s + Number(c.budget || 0), 0);
  }

  get totalMessagesAll(): number {
    return this.filteredCampaigns.reduce((s, c) => s + this.totalMessages(c), 0);
  }

  get totalBooked(): number {
    return this.filteredCampaigns.reduce((s, c) => s + Number(c.patients_booked || 0), 0);
  }

  get totalPaid(): number {
    return this.filteredCampaigns.reduce((s, c) => s + Number(c.patients_paid || 0), 0);
  }

  get totalRevenue(): number {
  return this.filteredCampaigns.reduce((s, c) => s + this.campaignRevenue(c), 0);
}

  get totalProfit(): number {
    return this.totalRevenue - this.totalBudget;
  }

  get globalRoi(): number {
    return this.totalBudget ? (this.totalProfit / this.totalBudget) * 100 : 0;
  }

  get conversionRate(): number {
    return this.totalMessagesAll
      ? (this.totalBooked / this.totalMessagesAll) * 100
      : 0;
  }

  

  get costPerPatient(): number {
    return this.totalBooked ? this.totalBudget / this.totalBooked : 0;
  }

  get revenuePerPatient(): number {
    return this.totalBooked ? this.totalRevenue / this.totalBooked : 0;
  }

  daysUntil(dateStr: string): number {
    if (!dateStr) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const target = new Date(dateStr);
    target.setHours(0, 0, 0, 0);

    return Math.ceil(
      (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  isReminderSoon(r: MarketingReminder): boolean {
    const days = this.daysUntil(r.next_payment);
    return days >= 0 && days <= Number(r.reminder_days || 14);
  }

  formatMoney(v: any): string {
    return Number(v || 0).toFixed(3);
  }

  formatPercent(v: any): string {
    return Number(v || 0).toFixed(1);
  }

  formatHeaderDate(): string {
    return new Date().toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  private normalizeCampaign(c: any): MarketingCampaign {
    return {
      id: c.id ?? null,
      name: c.name || '',
      platform: c.platform || 'Facebook + Instagram',
      centre: c.centre || c.center || 'Tous',
      budget: Number(c.budget || 0),
      messages_whatsapp: Number(c.messages_whatsapp || 0),
      messages_messenger: Number(c.messages_messenger || 0),
      messages_instagram: Number(c.messages_instagram || 0),
      patients_booked: Number(c.patients_booked || 0),
      patients_paid: Number(c.patients_paid || 0),
      revenue: Number(c.revenue || 0),
      start_date: c.start_date || '',
      end_date: c.end_date || '',
      notes: c.notes || ''
    };
  }

  private demoCampaigns(): MarketingCampaign[] {
    return [
      {
        id: 1,
        name: 'OHB Juin',
        platform: 'Facebook + Instagram',
        centre: 'Tous',
        budget: 177.78,
        messages_whatsapp: 28,
        messages_messenger: 22,
        messages_instagram: 26,
        patients_booked: 4,
        patients_paid: 4,
        revenue: 460,
        start_date: '2026-06-06',
        end_date: '2026-06-17',
        notes: 'Campagne Meta Ads OHB'
      }
    ];
  }

  private demoReminders(): MarketingReminder[] {
    return [
      {
        service_name: 'Meta Ads',
        amount: 177.78,
        currency: 'DT',
        renewal_type: 'Mensuel',
        next_payment: '2026-06-30',
        reminder_days: 14
      },
      {
        service_name: 'Domaine oxyboreal.com',
        amount: 45,
        currency: 'DT',
        renewal_type: 'Annuel',
        next_payment: '2026-07-15',
        reminder_days: 20
      }
    ];
  }

  loadAdmin(): void {
    this.service.getSignladmin(1).subscribe({
      next: (res: any) => {
        const adminData = Array.isArray(res?.data) ? res.data[0] : (res?.data || res || {});
        this.logo = adminData.logo || '';
        this.photo = adminData.img || adminData.photo || '';
      },
      error: (err: any) => {
        console.error('MARKETING ADMIN ERROR:', err);
        this.logo = '';
        this.photo = '';
      }
    });
  }


setPeriod(period: 'month' | 'year' | 'custom'): void {
  this.selectedPeriod = period;
}

isCampaignInPeriod(c: MarketingCampaign): boolean {
  const dateStr = c.start_date || c.end_date;
  if (!dateStr) return true;

  const d = new Date(dateStr);
  const today = new Date();

  if (Number.isNaN(d.getTime())) return true;

  if (this.selectedPeriod === 'month') {
    return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth();
  }

  if (this.selectedPeriod === 'year') {
    return d.getFullYear() === today.getFullYear();
  }

  if (this.selectedPeriod === 'custom') {
    if (!this.customStart || !this.customEnd) return true;

    const start = new Date(this.customStart);
    const end = new Date(this.customEnd);
    end.setHours(23, 59, 59, 999);

    return d >= start && d <= end;
  }

  return true;
}

get filteredCampaigns(): MarketingCampaign[] {
  return this.campaigns.filter(c => this.isCampaignInPeriod(c));
}
  
markReminderPaid(r: any): void {
  if (!confirm('Confirmer que ce rappel est payé ?')) return;

  this.service.payMarketingReminder(r.id).subscribe({
    next: (res: any) => {
      if (res?.success) {
        alert('Paiement confirmé. Prochaine date : ' + res.next_payment);
        this.loadReminders();
      } else {
        alert(res?.message || 'Erreur paiement.');
      }
    },
    error: () => alert('Erreur serveur paiement.')
  });
}

}
