import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../model/service.service';
import html2pdf from 'html2pdf.js';
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
  const content = document.getElementById('invoice-print-area');
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    this.downloadPdf();
    return;
  }
  if (!content) {
    alert('Facture introuvable');
    return;
  }

  const oldFrame = document.getElementById('invoice-print-frame');
  if (oldFrame) oldFrame.remove();

  const iframe = document.createElement('iframe');
  iframe.id = 'invoice-print-frame';
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) return;

  let html = content.outerHTML;

  html = html.replace(
    /src="assets\/img\/logo2\.jpg"/g,
    `src="${window.location.origin}/assets/img/logo2.jpg"`
  );

  doc.open();
  doc.write(`
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Facture</title>

<style>
${this.getInvoicePrintCss()}
</style>
</head>

<body>
${html}
</body>
</html>
`);
  doc.close();

  setTimeout(() => {
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
  }, 800);
}

getInvoicePrintCss(): string {
  return `
*{
  box-sizing:border-box !important;
}

@page{
  size:A4 portrait;
  margin:6mm;
}

html,body{
  margin:0 !important;
  padding:0 !important;
  background:#fff !important;
  font-family:'Segoe UI', Arial, sans-serif !important;
  color:#111 !important;
  -webkit-print-color-adjust:exact !important;
  print-color-adjust:exact !important;
}

.invoice-paper{
  width:190mm !important;
  min-height:270mm !important;
  padding:10mm 14mm !important;
  margin:0 auto !important;
  background:#fff !important;
  font-size:10px !important;
}

.invoice-header-model{
  display:flex !important;
  justify-content:space-between !important;
  align-items:flex-start !important;
}

.invoice-header-model h1{
  font-size:26px !important;
  color:#0A2A66 !important;
  margin:0 !important;
  font-weight:400 !important;
}

.invoice-logo-round{
  width:95px !important;
  height:70px !important;
  max-width:95px !important;
  max-height:70px !important;
  flex:0 0 95px !important;
  display:flex !important;
  align-items:center !important;
  justify-content:center !important;
  overflow:hidden !important;
  background:transparent !important;
  border-radius:0 !important;
}

.invoice-logo-round img{
  width:95px !important;
  height:70px !important;
  max-width:95px !important;
  max-height:70px !important;
  object-fit:contain !important;
  display:block !important;
}

.invoice-blue-line{
  height:2px !important;
  background:#2f6fd6 !important;
  margin:10px 0 18px !important;
}

.invoice-paper h3{
  font-size:26px !important;
  margin:0 0 12px !important;
  font-weight:400 !important;
}

.invoice-paper p{
  margin:4px 0 !important;
}

.invoice-info-box{
  display:grid !important;
  grid-template-columns:1.25fr 1fr !important;
  gap:55px !important;
  margin-top:28px !important;
  margin-bottom:32px !important;
}

.invoice-grey-box{
  background:#f1f1f1 !important;
  padding:12px !important;
}

.invoice-info-box h4{
  font-size:22px !important;
  margin:0 0 10px !important;
  font-family: "Segoe UI", Arial, sans-serif !important;
  font-weight:700 !important;
  color:#111 !important;
}

.invoice-blue-line.large{
  margin-top:32px !important;
}

.invoice-real-table{
  width:100% !important;
  border-collapse:collapse !important;
  table-layout:auto !important;   /* بدل fixed */
  margin-top:10px !important;
  font-size:10px !important;
}

.invoice-real-table th,
.invoice-real-table td{
  border:1px solid #111 !important;
  padding:7px 6px !important;
  text-align:left !important;
  vertical-align:middle !important;

  word-break:normal !important;
  overflow-wrap:normal !important;
  white-space:normal !important;
}

.invoice-totals-model{
  margin-top:18px !important;
  margin-left:10px !important;
  line-height:1.6 !important;
}
.invoice-real-table th:first-child,
.invoice-real-table td:first-child{
  width:34% !important;
  white-space:nowrap !important;
}
.signature{
  text-align:center !important;
  font-weight:800 !important;
  margin:32px 0 !important;
}

.invoice-footer-model{
  border-top:2px solid #2f6fd6 !important;
  padding-top:14px !important;
  display:flex !important;
  justify-content:space-between !important;
  font-size:9px !important;
}

.invoice-bottom-blue{
  display:none !important;
}
`;
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
downloadPdf(): void {

  const element = document.getElementById('invoice-print-area');

  if (!element) {
    return;
  }

  const opt = {
    margin: 5,
    filename: 'Facture.pdf',
    image: {
      type: 'jpeg',
      quality: 1
    },
    html2canvas: {
      scale: 2,
      useCORS: true
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    }
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save();
}



}
