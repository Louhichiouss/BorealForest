
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ServiceService, MoveEventParams } from '../model/service.service';
import { DayPilot, DayPilotCalendarComponent } from "@daypilot/daypilot-lite-angular";
import { firstValueFrom } from "rxjs";

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
@Component({
  selector: 'calendar-component',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {
  @ViewChild("calendar") calendar!: DayPilotCalendarComponent;
am:any
  patients: any;



    constructor(private appcomponent: AppComponent, private service: ServiceService ) {
  }
  
  events!: any[];

  get date(): DayPilot.Date {
    return this.calendarConfig.startDate as DayPilot.Date;
  }

  

  set date(val: DayPilot.Date) {
    this.calendarConfig.startDate = val;
  }

  navigatorConfig: DayPilot.NavigatorConfig = {
    selectMode: "Week",
    showMonths: 2,
    skipMonths: 2
  };

  calendarConfig: DayPilot.CalendarConfig = {
    startDate: DayPilot.Date.today(),
    viewType: "Week",
    eventDeleteHandling: "Update",
    onEventDeleted: args => {
      if (window.confirm("Are you sure you want to delete this event?")) {
        this.service.deleteEvent(args.e.id()).subscribe(result => console.log("Deleted"));
      } 
      
    },
    onEventMoved: args => {
      console.log("New start time:", args.newStart);
      console.log("New end time:", args.newEnd);
      let params: MoveEventParams = {
        
        id: args.e.id(),
        newStart: args.newStart,
        newEnd: args.newEnd
        
      };
      this.service.moveEvent(params).subscribe(result => 
        
        console.log("Moved"));
    },
    onEventResized: args => {
      console.log("New start time:", args.newStart);
      console.log("New end time:", args.newEnd);
      let params: MoveEventParams = {
        id: args.e.id(),
        newStart: args.newStart,
        newEnd: args.newEnd
      };
      this.service.moveEvent(params).subscribe(result => console.log("Resized"));
    },
    onTimeRangeSelected: async args => {
      const colors = [
        {name: "Bleu", id: "#3c78d8"},
        {name: "vert", id: "#6aa84f"},
       
        {name: "Rouge", id: "#cc0000"},
      ];

      const form = [
        {name: "Name", id: "text"},
        {name: "Start", id: "start", type: "datetime"},
        {name: "End", id: "end", type: "datetime"},
        {name: "Color", id: "barColor", type: "select", options: colors},
      ];

      const data = {
        start: args.start,
        end: args.end,
        barColor: "#3c78d8"
      };

      const modal = await DayPilot.Modal.form(form, data);

      this.calendar.control.clearSelection();

      if (modal.canceled) {
        return;
      }

      const result = await firstValueFrom(this.service.createEvent(modal.result));

      this.events.push(modal.result);
      console.log("New event created:", modal.result);
    }
  };

    ngOnInit(): void {
          this.appcomponent.hideHeaderAndFooter=true;

          registerLocaleData(localeFr);

           
    this.service.getpinterface().subscribe((result: any) => {
      this.patients = result.data;
      // console.log(this.patients);
    

    this.am=this.patients.length
    // console.log(this.am)

  });
  }
  viewChange(): void {
    this.service.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd()).subscribe(result => {
      this.events = result;
      console.log("Events retrieved from backend:", result);
    });
  }


}

