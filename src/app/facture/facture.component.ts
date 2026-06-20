import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../model/service.service';

type InvoiceStatus = 'Paid' | 'Unpaid' | 'Partial';

interface PatientInvoice {
  id: number;
  invoiceNumber: string;
  patientId: number;
  patientName: string;
  center: string;
  date: string;
  sessions: number;
  unitPriceTtc: number;
  total: number;
  
  status: InvoiceStatus;
}

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  searchText = '';
  statusFilter = '';
logo = '';
photo = '';
  showFormModal = false;
  showDetailsModal = false;
  isEditMode = false;

  selectedInvoice: PatientInvoice | null = null;

  invoices: PatientInvoice[] = [];

  patientSearch = '';
  patientResults: any[] = [];
  selectedPatient: any = null;

  invoiceForm = this.fb.group({
    id: [null],
    invoiceNumber: ['', Validators.required],
    date: ['', Validators.required],
    patientId: [null, Validators.required],
    patientName: ['', Validators.required],
    center: ['', Validators.required],
    sessions: ['', Validators.required],
    unitPriceTtc: ['', Validators.required],
    status: ['Paid', Validators.required]
  });

  constructor(
    private appcomponent: AppComponent,
    private fb: FormBuilder,
    private service: ServiceService
  ) {}

  ngOnInit(): void {
   this.appcomponent.hideHeaderAndFooter = true;

  this.loadAdmin();

  this.loadInvoices();
  }

  loadInvoices(): void {
    this.service.getFacturePatient().subscribe((res: any) => {
      const rows = res?.data || [];

      this.invoices = rows.map((f: any) => ({
        id: Number(f.id),
        invoiceNumber: `Facture${String(f.date_facture || '').slice(0, 4)}-${String(f.id).padStart(4, '0')}`,
        patientId: Number(f.patient_id),
        patientName: f.patient_nom || '—',
        center: f.centre || 'Tunis',
        date: f.date_facture || '',
        sessions: Number(f.nb_seances || 0),
        unitPriceTtc: Number(f.prix_unitaire || 0),
        total: Number(f.total || 0),
        status: f.statut || 'Paid'
      }));
    });
  }

  searchPatients(): void {
    const q = this.patientSearch.trim();

    if (q.length < 2) {
      this.patientResults = [];
      return;
    }

    this.service.searchPatient(q).subscribe((res: any) => {
      this.patientResults = res?.data || [];
    });
  }

  selectPatient(patient: any): void {
    this.selectedPatient = patient;
    this.patientSearch = `${patient.P_nom} ${patient.P_prenom}`;
    this.patientResults = [];

    this.invoiceForm.patchValue({
      patientId: patient.P_id,
      patientName: `${patient.P_nom} ${patient.P_prenom}`,
      center: patient.P_region
    });
  }

  get filteredInvoices(): PatientInvoice[] {
    const q = this.searchText.toLowerCase().trim();

    return this.invoices.filter(inv => {
      const okSearch =
        !q ||
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.patientName.toLowerCase().includes(q) ||
        inv.center.toLowerCase().includes(q) ||
        inv.date.includes(q);

      const okStatus = !this.statusFilter || inv.status === this.statusFilter;

      return okSearch && okStatus;
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.selectedInvoice = null;
    this.selectedPatient = null;
    this.patientSearch = '';
    this.patientResults = [];

    this.invoiceForm.reset({
      id: null,
      invoiceNumber: this.nextInvoiceNumber(),
      date: new Date().toISOString().split('T')[0],
      patientId: null,
      patientName: '',
      center: '',
      sessions: '',
      unitPriceTtc: 115 as any,
      status: 'Paid'
    });

    this.showFormModal = true;
  }

  openEditModal(invoice: PatientInvoice): void {
    this.isEditMode = true;
    this.selectedInvoice = invoice;
    this.patientSearch = invoice.patientName;
    this.patientResults = [];

    this.invoiceForm.patchValue({
      id: invoice.id as any,
      invoiceNumber: invoice.invoiceNumber,
      date: invoice.date,
      patientId: invoice.patientId as any,
      patientName: invoice.patientName,
      center: invoice.center,
      sessions: invoice.sessions as any,
      unitPriceTtc: invoice.unitPriceTtc as any,
      status: invoice.status
    });

    this.showFormModal = true;
  }

  saveInvoice(): void {
    if (this.invoiceForm.invalid) {
      alert('Veuillez choisir un patient et remplir tous les champs.');
      return;
    }

    const v: any = this.invoiceForm.value;
    const total = Number(v.sessions || 0) * Number(v.unitPriceTtc || 0);

    const payload: any = {
      id: v.id,
      patient_id: Number(v.patientId),
      patient_nom: v.patientName,
      centre: v.center,
      nb_seances: Number(v.sessions),
      prix_unitaire: Number(v.unitPriceTtc),
      total: total,
      statut: v.status,
      date_facture: v.date
    };

    const request = this.isEditMode
      ? this.service.updateFacturePatient(payload)
      : this.service.addFacturePatient(payload);

    request.subscribe({
      next: () => {
        alert(this.isEditMode ? 'Facture modifiée avec succès.' : 'Facture ajoutée avec succès.');
        this.closeFormModal();
        this.loadInvoices();
      },
      error: () => alert('Erreur sauvegarde facture.')
    });
  }

  deleteInvoice(invoice: PatientInvoice): void {
    if (!confirm('Voulez-vous vraiment supprimer cette facture ?')) return;

    this.service.deleteFacturePatient(invoice.id).subscribe({
      next: () => {
        this.invoices = this.invoices.filter(i => i.id !== invoice.id);
      },
      error: () => alert('Erreur suppression facture.')
    });
  }

  openDetailsModal(invoice: PatientInvoice): void {
    this.selectedInvoice = invoice;
    this.showDetailsModal = true;
  }

  closeFormModal(): void {
    this.showFormModal = false;
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
  }

  nextInvoiceNumber(): string {
    const year = new Date().getFullYear();
    return `Facture${year}-${String(this.invoices.length + 1).padStart(4, '0')}`;
  }

  htFromTtc(ttc: number): number {
    return Number(ttc || 0) / 1.19;
  }

  tvaFromTtc(ttc: number): number {
    return Number(ttc || 0) - this.htFromTtc(ttc);
  }

  totalTtc(invoice: PatientInvoice): number {
    return Number(invoice.sessions || 0) * Number(invoice.unitPriceTtc || 0);
  }

  totalHt(invoice: PatientInvoice): number {
    return this.htFromTtc(this.totalTtc(invoice));
  }

  totalTva(invoice: PatientInvoice): number {
    return this.tvaFromTtc(this.totalTtc(invoice));
  }

  unitPriceHt(invoice: PatientInvoice): number {
    return this.htFromTtc(invoice.unitPriceTtc);
  }

  formTotalTtc(): number {
    return Number(this.invoiceForm.value.sessions || 0) * Number(this.invoiceForm.value.unitPriceTtc || 0);
  }

  formTotalHt(): number {
    return this.htFromTtc(this.formTotalTtc());
  }

  formTotalTva(): number {
    return this.tvaFromTtc(this.formTotalTtc());
  }

  formatMoney(value: any): string {
    return Number(value || 0).toFixed(2);
  }

  getPatientName(patientId: number): string {
    const inv = this.invoices.find(i => i.patientId === Number(patientId));
    return inv?.patientName || this.invoiceForm.value.patientName || '—';
  }

  getPatientPhone(patientId: number): string {
    return this.selectedPatient?.P_tel || '+216 56 811 602';
  }

  getCenterAddress(center: string): string {
    if (center === 'Sfax') return 'Rue Ahmed Aloulou, Immeuble Ibn Sina, Tunisie';
    if (center === 'Sousse') return 'En face Clinique Le Yoser, Sousse';
    return '31 Alain Savary, en face club de tennis, au-dessus Banque Zitouna, Tunis';
  }

  formatHeaderDate(): string {
    return new Date().toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  getCenterBadgeClass(center: string): string {
    return 'badge-' + String(center || 'tunis').toLowerCase();
  }

  getStatusClass(status: string): string {
    return 'status-' + String(status || '').toLowerCase();
  }

  printInvoice(): void {
    const invoiceElement = document.getElementById('invoice-print-area');
    if (!invoiceElement) return;

    const printWindow = window.open('', '_blank', 'width=900,height=1000');
    if (!printWindow) return;

    let invoiceHtml = invoiceElement.outerHTML;
    invoiceHtml = invoiceHtml.replace(/src="assets\/img\/logo2\.jpg"/g, `src="${window.location.origin}/assets/img/logo2.jpg"`);

    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Facture</title>
          <style>
            body{font-family:Arial;margin:0;padding:20px;background:white}
            .invoice-paper{width:190mm;margin:auto;font-size:11px}
            .invoice-header-model{display:flex;justify-content:space-between}
            .invoice-header-model h1{font-size:34px;color:#0A2A66;margin:0}
            .invoice-logo-round{width:120px;height:80px}
            .invoice-logo-round img{width:100%;height:100%;object-fit:contain}
            .invoice-blue-line{height:2px;background:#2f6fd6;margin:10px 0 18px}
            .invoice-info-box{display:grid;grid-template-columns:1.3fr 1fr;gap:70px;margin-top:28px}
            .invoice-grey-box{background:#f1f1f1;padding:12px}
            table{width:100%;border-collapse:collapse;margin-top:10px}
            th,td{border:1px solid #111;padding:8px;text-align:left}
            .signature{text-align:center;font-weight:bold;margin:35px 0}
            .invoice-footer-model{border-top:2px solid #2f6fd6;padding-top:14px;display:flex;justify-content:space-between;font-size:10px}
            .invoice-bottom-blue{height:22px;background:#3f73d3;margin-top:14px}
          </style>
        </head>
        <body>
          ${invoiceHtml}
          <script>window.onload=function(){setTimeout(function(){window.print();},500)}</script>
        </body>
      </html>
    `);
    printWindow.document.close();
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
mobileMenuOpen = false;

toggleMobileMenu(): void {
  this.mobileMenuOpen = !this.mobileMenuOpen;
}

closeMobileMenu(): void {
  this.mobileMenuOpen = false;
}
}
