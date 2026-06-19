



import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ServiceService } from '../model/service.service';

type ViewMode = 'list' | 'calendar';

interface CalendarDay {
  date: string;
  dayNumber: number | null;
  isToday: boolean;
  isSelected: boolean;
  appointments: any[];
}

@Component({
  selector: 'calendar-component',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {
  am = 0;

patientSuggestions: any[] = [];
selectedPatient: any = null;
showPatientSuggestions = false;


  events: any[] = [];
  patients: any[] = [];
  filteredEvents: any[] = [];
  currentDate: String = '';

  viewMode: ViewMode = 'list';

  searchText = '';
  centerFilter = '';
  statusFilter = '';

  currentMonthDate = new Date();
  selectedDate = '';
  selectedDayAppointments: any[] = [];
  calendarDays: CalendarDay[] = [];

  showModal = false;
  isEditMode = false;
  logo = '';
photo = '';

  formData: any = {
  id: null,
  text: '',
  phone: '',
  seancesFaites: 0,
  seancesPrevues: 0,
  center: 'Tunis',
  date: '',
  time: '09:00',
  duration: '80 minutes',

  
  status: 'Pending'
};

  readonly monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  readonly dayLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  constructor(
    private appcomponent: AppComponent,
    private service: ServiceService
  ) {}
loadPatientsAndEvents(): void {
  this.service.getpatient().subscribe({
    next: (patientsResult: any) => {
      this.patients = patientsResult?.data || patientsResult || [];
      this.loadEvents();
    },
    error: () => {
      this.patients = [];
      this.loadEvents();
    }
  });
}
// getPatientTotalSeances(phone: string): number {
//   const patient = this.patients.find((p: any) =>
//     String(p.P_tel || '').trim() === String(phone || '').trim()
//   );

//   return parseInt(patient?.P_nbs || '0', 10) || 0;
// }

// getCompletedSeances(phone: string): number {
//   if (!phone) return 0;

//   return this.events.filter((e: any) =>
//     String(e.phone || '').trim() === String(phone || '').trim()
//     && e.status === 'Completed'
//   ).length;
// }

getSessionProgress(ev: any): string {
  if (ev?.status !== 'Completed') return '';

  const done = parseInt(String(ev?.seances_faites || 0), 10) || 0;
  const total = parseInt(String(ev?.seances_prevues || 0), 10) || 0;

  if (!total) return '';

  return `${done}/${total} séances`;
}
  ngOnInit(): void {
   this.appcomponent.hideHeaderAndFooter = true;

  this.loadAdmin();

  this.loadNotifications();
  this.loadPatientsAndEvents();

  const today = new Date();

  this.currentDate = today.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  }

onPatientSearch(): void {
  const q = String(this.formData.text || '').trim();

  this.selectedPatient = null;

  if (q.length < 2) {
    this.patientSuggestions = [];
    this.showPatientSuggestions = false;
    return;
  }

  this.service.searchPatient(q).subscribe({
    next: (result: any) => {
      this.patientSuggestions = result?.data || result || [];
      this.showPatientSuggestions = this.patientSuggestions.length > 0;
    },
    error: () => {
      this.patientSuggestions = [];
      this.showPatientSuggestions = false;
    }
  });
}

selectPatient(patient: any): void {
  const fullName = `${patient.P_nom || ''} ${patient.P_prenom || ''}`.trim();

  this.selectedPatient = patient;
  this.formData.text = fullName;
  this.formData.center = patient.P_region || 'Tunis';
this.formData.phone = patient.P_tel || '';
this.formData.seancesFaites = parseInt(String(patient.P_n ?? patient.p_n ?? 0), 10) || 0;
this.formData.seancesPrevues = parseInt(String(patient.P_nbs ?? patient.p_nbs ?? 0), 10) || 0;

console.log('Selected patient:', patient);
console.log('Sessions:', this.formData.seancesFaites, this.formData.seancesPrevues);
  this.patientSuggestions = [];
  this.showPatientSuggestions = false;
}

  loadNotifications(): void {
    this.service.getpinterface().subscribe((result: any) => {
      this.am = (result?.data || []).length;
    });
  }

  loadEvents(): void {
    this.service.getdate().subscribe((result: any) => {
      const data = result?.data || result || [];
      this.events = data
        .map((e: any) => this.normalizeEvent(e))
        .sort((a: any, b: any) => (b.date + b.time).localeCompare(a.date + a.time));

      this.applyFilters();
      this.buildCalendar();
    });
  }

  normalizeEvent(e: any): any {
    const start = String(e.start || '');
    const end = String(e.end || '');
    const text = String(e.text || e.title || '');

 return {
  id: e.id,
  text,
  patient: this.extractPatient(text),
  phone: e.patient_phone || this.extractPhone(text),
  seances_faites: e.seances_faites || 0,
  seances_prevues: e.seances_prevues || 0,
  center: this.extractCenter(text),
  date: this.extractDate(start),
  time: this.extractTime(start),
  endTime: this.extractTime(end),
  duration: this.extractDuration(start, end),
  status: this.colorToStatus(e.barColor || e.backColor),
  barColor: e.barColor || e.backColor || '#3c78d8'
};
  }

extractPatient(text: string): string {
  const beforePhone = String(text || '').split('|')[0];

  return beforePhone
    .replace(/Tunis|Sousse|Sfax/gi, '')
    .replace(/[:\-]/g, ' ')
    .trim() || 'Patient';
}
  extractCenter(text: string): string {
    const t = String(text || '').toLowerCase();
    if (t.includes('sousse')) return 'Sousse';
    if (t.includes('sfax')) return 'Sfax';
    return 'Tunis';
  }

  extractDate(value: string): string {
    if (!value) return '';
    return value.includes('T') ? value.split('T')[0] : value.split(' ')[0];
  }

  extractTime(value: string): string {
    if (!value) return '';
    if (value.includes('T')) return value.split('T')[1].substring(0, 5);
    if (value.includes(' ')) return value.split(' ')[1].substring(0, 5);
    return '';
  }

  extractDuration(startValue: string, endValue: string): string {
    const start = new Date(startValue);
    const end = new Date(endValue);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return '80 minutes';
    const minutes = Math.round((end.getTime() - start.getTime()) / 60000);
    return `${minutes} minutes`;
  }

colorToStatus(color: string): string {
  const c = String(color || '').toLowerCase();

  if (c === '#f1c232') return 'Pending';     // orange
  if (c === '#3c78d8') return 'Confirmed';   // blue
  if (c === '#6aa84f') return 'Completed';   // green
  if (c === '#cc0000') return 'Cancelled';   // red

  return 'Pending';
}

 statusToColor(status: string): string {
  if (status === 'Pending') return '#f1c232';
  if (status === 'Confirmed') return '#3c78d8';
  if (status === 'Completed') return '#6aa84f';
  if (status === 'Cancelled') return '#cc0000';

  return '#f1c232';
}
  applyFilters(): void {
    const q = (this.searchText || '').toLowerCase().trim();

    this.filteredEvents = this.events.filter((e: any) => {
      const matchSearch =
        !q ||
        String(e.patient || '').toLowerCase().includes(q) ||
        String(e.text || '').toLowerCase().includes(q) ||
        String(e.center || '').toLowerCase().includes(q);

      const matchCenter = !this.centerFilter || e.center === this.centerFilter;
      const matchStatus = !this.statusFilter || e.status === this.statusFilter;

      return matchSearch && matchCenter && matchStatus;
    });

    this.buildCalendar();
  }

  switchView(mode: ViewMode): void {
    this.viewMode = mode;
    this.buildCalendar();
  }

  get monthTitle(): string {
    return `${this.monthNames[this.currentMonthDate.getMonth()]} ${this.currentMonthDate.getFullYear()}`;
  }

  prevMonth(): void {
    this.currentMonthDate = new Date(this.currentMonthDate.getFullYear(), this.currentMonthDate.getMonth() - 1, 1);
    this.selectedDate = '';
    this.selectedDayAppointments = [];
    this.buildCalendar();
  }

  nextMonth(): void {
    this.currentMonthDate = new Date(this.currentMonthDate.getFullYear(), this.currentMonthDate.getMonth() + 1, 1);
    this.selectedDate = '';
    this.selectedDayAppointments = [];
    this.buildCalendar();
  }

  buildCalendar(): void {
    const year = this.currentMonthDate.getFullYear();
    const month = this.currentMonthDate.getMonth();
    const today = new Date().toISOString().split('T')[0];

    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = (firstDay + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;

    let calendarEvents = this.events.filter((e: any) => e.date?.startsWith(monthPrefix));
    if (this.centerFilter) calendarEvents = calendarEvents.filter((e: any) => e.center === this.centerFilter);
    if (this.statusFilter) calendarEvents = calendarEvents.filter((e: any) => e.status === this.statusFilter);
    if (this.searchText) {
      const q = this.searchText.toLowerCase().trim();
      calendarEvents = calendarEvents.filter((e: any) =>
        String(e.patient || '').toLowerCase().includes(q) ||
        String(e.text || '').toLowerCase().includes(q)
      );
    }

    const days: CalendarDay[] = [];

    for (let i = 0; i < startOffset; i++) {
      days.push({
        date: '',
        dayNumber: null,
        isToday: false,
        isSelected: false,
        appointments: []
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${monthPrefix}-${String(day).padStart(2, '0')}`;
      const appointments = calendarEvents
        .filter((e: any) => e.date === date)
        .sort((a: any, b: any) => String(a.time).localeCompare(String(b.time)));

      days.push({
        date,
        dayNumber: day,
        isToday: date === today,
        isSelected: date === this.selectedDate,
        appointments
      });
    }

    this.calendarDays = days;

    if (this.selectedDate) {
      this.selectedDayAppointments = calendarEvents.filter((e: any) => e.date === this.selectedDate);
    }
  }

  selectCalendarDay(day: CalendarDay): void {
    if (!day.date) return;
    this.selectedDate = day.date;
    this.selectedDayAppointments = day.appointments;
    this.buildCalendar();
  }

  openAddModal(date?: string): void {
  this.isEditMode = false;
  this.selectedPatient = null;
  this.patientSuggestions = [];
  this.showPatientSuggestions = false;

  const today = new Date().toISOString().split('T')[0];

  this.formData = {
    id: null,
    text: '',
    phone: '',
    seancesFaites: 0,
    seancesPrevues: 0,
    center: this.centerFilter || 'Tunis',
    date: date || this.selectedDate || today,
    time: '09:00',
    duration: '80 minutes',
    status: 'Pending'
  };

  this.showModal = true;
}

  openEditModal(ev: any): void {
    this.isEditMode = true;
    this.formData = { ...ev };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
extractPhone(text: string): string {
  const parts = String(text || '').split('|');
  return parts.length > 1 ? parts[1].trim() : '';
}
  saveAppointment(): void {
    if (!this.formData.text || !this.formData.date || !this.formData.time) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const durationMinutes = parseInt(String(this.formData.duration || '80'), 10) || 80;
    const startDate = new Date(`${this.formData.date}T${this.formData.time}:00`);
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

const payload: any = {
  id: this.formData.id,
  text: `${this.formData.center}: ${this.formData.text}`,
  start: `${this.formData.date}T${this.formData.time}:00`,
  end: `${this.formData.date}T${String(endDate.getHours()).padStart(2,'0')}:${String(endDate.getMinutes()).padStart(2,'0')}:00`,
  barColor: this.statusToColor(this.formData.status),
  patient_phone: this.formData.phone || '',
  seances_faites: this.formData.seancesFaites || 0,
  seances_prevues: this.formData.seancesPrevues || 0
};

    // For now we create new appointments. Later we can add API update/edit.
    const request = this.isEditMode
  ? this.service.updateEvent(payload)
  : this.service.createEvent(payload);

request.subscribe({
      next: () => {
        alert(this.isEditMode ? 'Rendez-vous enregistré.' : 'Rendez-vous ajouté.');
        this.closeModal();
        this.loadEvents();
      },
      error: () => alert('Erreur sauvegarde rendez-vous.')
    });
  }

deleteAppointment(ev?: any): void {
  const id = ev?.id || this.formData.id;

  if (!id) {
    alert('ID rendez-vous manquant');
    return;
  }

  if (confirm('Supprimer ce rendez-vous ?')) {
    this.service.deleteEvent(id).subscribe({
      next: () => {
        alert('Rendez-vous supprimé');
        this.closeModal();
        this.loadEvents();
      },
      error: () => alert('Erreur suppression rendez-vous')
    });
  }
}

  getCenterClass(center: string): string {
    return 'badge-' + String(center || 'tunis').toLowerCase();
  }

  getStatusClass(status: string): string {
    const s = String(status || '').toLowerCase();
    if (s === 'pending') return 'badge-pending';
    if (s === 'confirmed') return 'badge-confirmed';
    if (s === 'completed') return 'badge-completed';
    if (s === 'cancelled') return 'badge-cancelled';
    return 'badge-confirmed';
  }

statusLabel(status: string): string {
  switch(status){
    case 'Pending': return 'En attente';
    case 'Confirmed': return 'Confirmé';
    case 'Completed': return 'Terminé';
    case 'Cancelled': return 'Annulé';
    default: return status;
  }
}
  get totalEvents(): number {
    return this.filteredEvents.length;
  }

  get pendingCount(): number {
    return this.filteredEvents.filter((e: any) => e.status === 'Pending').length;
  }

  get confirmedCount(): number {
    return this.filteredEvents.filter((e: any) => e.status === 'Confirmed').length;
  }

  get completedCount(): number {
    return this.filteredEvents.filter((e: any) => e.status === 'Completed').length;
  }

  loadAdmin(): void {
  this.service.getSignladmin(1).subscribe({
    next: (res: any) => {
      const admin = res?.data || {};

      this.logo = admin.logo || '';
      this.photo = admin.img || '';

      console.log('LOGO=', this.logo);
      console.log('PHOTO=', this.photo);
    }
  });
}
}
