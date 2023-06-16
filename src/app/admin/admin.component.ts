import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../model/service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Patient, matriel, recette } from '../model/user';
import {ApexGrid,  ApexXAxis,   ApexAxisChartSeries,  ApexChart, ApexDataLabels, ApexFill, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexStates, ApexStroke, ApexTheme, ApexTitleSubtitle } from 'ng-apexcharts';
import { ChartOptions } from 'chart.js';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {
  

  series11: any;
  chart1: any;
  xaxis1:any;
  dataLabels1: any;
  grid1: any;
  stroke1:any;
  title1: any;
  z:any
  // @ViewChild("chart") chart: AdminComponent;
  // public chartOptions: Partial<ChartOptions>;


 Sb:number=0;
  Pf:number=0;
  Mi:number=0;
  Avc:number=0;
  Pd:number=0;
  Ca:number=0;
  Rcp:number=0;
  Be:number=0;
  Au:number=0;
  /************************************************ */
  [x: string]: any;
  voir
  tous
  voir1
  tous1
  voir2
  tous2
getForm:any
patient11:any=[]
Matriel1:any=[] 
  patients :Patient[]=[];
  patient:any=[]
  Matriels: matriel[] = [];
  Matriel:any=[]


p:any
a:any
recettess :recette []=[];
recettes :recette []=[];
s:any
tr:any =[]
rect:any
events!:any [];
e:any
sum:any
summ:any
trr:any
am:any
dayofweek:any=[]
 numericTable = [];
  constructor(
    private appcomponent: AppComponent,
    private http: HttpClient,
    private service: ServiceService,
    private formbuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private url: ActivatedRoute
  ){

    
 this.getForm=this.formbuilder.group({
    
      P_tel:['',Validators.required],
      Nom:['',Validators.required],
          
    jour:['',Validators.required],
 })
 this.voir=false
    this.tous= true
    this.voir1=false
    this.tous1= true
    this.voir2=false
    this.tous2= true
    this.service.getrecette().subscribe(
      (result: any) => {
        this.recettes = result.data;
        // console.log(this.recettes);
        this.dayofweek = [];
        const currentDate = new Date();
        const currentWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
        const currentWeekEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 6);
        for (let i = 0; i < this.recettes.length; i++) {
          const date = new Date(this.recettes[i].date);
          if (date >= currentWeekStart && date <= currentWeekEnd) {
            const day = date.toLocaleDateString('fr', { weekday: 'long' });
            this.dayofweek.push(day);
            // console.log(`${this.recettes[i].date} est un ${day}`);
            // console.log(this.recettes[i].beneficie)
          }
        }
        // console.log(this.dayofweek);
    
        // Initialize an empty array with 0 values for each day of the week
        const dataArr = [0, 0, 0, 0, 0, 0, 0];
    
        // Loop through the recipes and add the benefice to the appropriate day of the week
        // for (let i = 0; i < this.recettes.length; i++) {
        //   const date = new Date(this.recettes[i].date);
        //   const benefice = this.recettes[i].beneficie;
        //   // console.log(benefice)
        //   if (date >= currentWeekStart && date <= currentWeekEnd) {
        //     const dayIndex = date.getDay();
        //     dataArr[dayIndex] += benefice;
        //     console.log(dataArr[dayIndex])
        //   }
        // }
    
        // Set the chart data to the array we just built
        this.series11 = [
          {
            name: 'Bénéfice Net',
            data: dataArr
          }
        ];
    
        this.chart1 = {
          height: 350,
          width: 800,
          type: 'line',
          zoom: {
            enabled: false
          },
          dropShadow: {
            enabled: true,
            color: '#113',
            top: -1,
            left: 1,
            blur: 6,
            opacity: 0.8
          }
        };
    
        this.xaxis1 = {
          categories: [
            'dimanche',
            'lundi',
            'mardi',
            'mercredi',
            'jeudi',
            'vendredi',
            'samedi',
           
          ]
        };
    
        this.dataLabels1= {
          enabled: true
        };
    
        this.grid1 = {
          row: {
            colors: ['black', 'transparent'],
            opacity: 0.5
          }
        };
    
        this.stroke1 = {
          curve: 'straight'
        };
    
        this.title1 = {
          text: 'Bénéfice Net',
          align: 'centre'
        };
      }
    );
    
  }
  ngOnInit(): void {
    



  
    this.appcomponent.hideHeaderAndFooter=true;

      this.service.getdate().subscribe(
        (result:any)=>{
          this.events=result.data
          // console.log(result.data)
          this.e=this.events.length

        }
      )
    // this.service.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd()).subscribe(result => {
    //   this.events = result;
    //   console.log("Events retrieved from backend:  oussema bkrowno");
  

    // });



    this.service.getpatient().subscribe(
      (result:any)=>{
        this.patients=result.data
        this.patient=this.patients 
this.p=this.patients.length
// console.log(this.patient)

for (let i = 0; i < this.patient.length; i++) {
if ((this.patient[i].P_c=='Autisme') ) {
 
 this.Au=this.Au+1
 
} if((this.patient[i].P_c=='pour le bien être') ) {
   this.Be=this.Be+1
   
   

}if((this.patient[i].P_c=='Rétablissement aprés une opération de chirurgie plastique') ) {

  this.Rcp=this.Rcp+1
  


}if((this.patient[i].P_c=='Cancer') ) {

  this.Ca=this.Ca+1


}if((this.patient[i].P_c=='plaies diabétique') ) {


  this.Pd=this.Pd+1

}
if((this.patient[i].P_c=='AVC') ) {


  this.Avc=this.Avc+1

}
if((this.patient[i].P_c=='Migrane') ) {


  this.Mi=this.Mi+1

}
if((this.patient[i].P_c=='Surdite brusque') ) {


  this.Sb=this.Sb+1

}
if((this.patient[i].P_c=='Paralysie faciale') ) {


  this.Pf=this.Pf+1

}











}

this.chartSeries = [this.Pf, this.Sb, this.Mi, this.Avc, this.Pd, this.Ca, this.Rcp, this.Be, this.Au];
this.series11 = [1,2,3,4,6,9,8];

      }

    )
   
    this.service.getmatriel().subscribe(
      (result:any)=>{
        // console.log(result); // check if the data is received properly
        this.Matriels=result.data
        this.trr = [];
        for (let i = 0; i < this.Matriels.length; i++) {
          this.trr.push(this.Matriels[i].Quantite.toString());
        // this.sum=this.sum+this.tr
        }
        // console.log(this.trr);
        // console.log(this.trr.length);
        this.summ = 0;
        for (let i = 0; i < this.trr.length; i++) {
          this.summ = this.summ + parseInt(this.trr[i], 10);
        }
        // console.log(this.summ);
        
      }
    )
  
    

    this.service.getrecette().subscribe(
      (result:any)=>{
        // console.log(result); // check if the data is received properly
        this.recettes=result.data
        this.tr = [];
        // for (let i = 0; i < this.recettes.length; i++) {
        //   this.tr.push(this.recettes[i].beneficie.toString());
        // // this.sum=this.sum+this.tr
        // }
        // console.log(this.tr);
        // console.log(this.tr.length);
        this.sum = 0;
        for (let i = 0; i < this.tr.length; i++) {
          this.sum = this.sum + parseInt(this.tr[i], 10);
        }
        



      }
    )
    
    
    this.service.getpinterface().subscribe((result: any) => {
      this.patients = result.data;
      // console.log(this.patients);
    

    this.am=this.patients.length
    // console.log(this.am)

  });


  }
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }





  title = 'apex-ng-14';
  chartSeries: ApexNonAxisChartSeries = [];
  chartDetails: ApexChart = {
    width: 800,
    zoom: {
      enabled: false
    },
    type: "donut",
    dropShadow: {
      enabled: true,
      color: "#113",
      top:-1,
      left: 2,
      blur: 6,
      opacity: 0.8
    }
  };
  
  chartfill: ApexFill = {
    type: "pattern",
    opacity: 9,
    pattern: {
      style: [
        // "verticalLines",
        "squares",
        "squares",
        "squares",
        "squares",
        "squares",
        // "horizontalLines",
        // "circles",
        // "slantedLines"
      ]
    }
  };
  chartstroke:ApexStroke={
    width: 0

  };
  chartplotOptions:ApexPlotOptions={

    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            showAlways: true,
            show: true
          }
        }
      }
    }
  };
  chartstates:ApexStates={
    hover: {
      filter: {
        type: "none"
      }
    }
  };


  charttheme:ApexTheme={
    palette: "palette2"
  }
  chartLabels = ["Paralysie faciale", "Surdite brusque", "Migrane", "AVC", "plaies diabetique", "Cancer", "Retablissement apres une operation de chirurgie plastique", "pour le bien etre", "Autisme"];

  chartTitle: ApexTitleSubtitle = {
    text: 'Etat Santé',
    align: 'center'
  };
 chartresponsive: ApexResponsive[] = [
  {
    breakpoint: 480,
    options: {
      chart: {
        width: 100
      },
      legend: {
        position: "bottom"
      }
    }
  }
];

  
  chartDataLabels: ApexDataLabels = {
    enabled: true
    
  };






  retour():void{

    this.z=0 
    for(var i = 0; i <this.patient.length; i++){
      if((this.patient[i].P_tel==this.getForm.value.P_tel)){
    
      this.patient11=(this.patient[i])
      this.voir=true
      this.tous=false

      console.log(this.patient11+"ddfdffddf")
      return;
      }
      else{
        this.z=this.z+1
        
      }
    }
  
    if(this.z>0){
      alert("Le numéro téléphone n'existe pas ou incorrecte")
      return;
    }
    

  }
  setMyval(){

    this.voir=false
    this.tous=true
  }
  retourn1():void{

    this.z=0
    for(var i = 0; i <this.Matriels.length; i++){
      if((this.Matriels[i].Nom==this.getForm.value.Nom)){
    
      this.Matriel1=(this.Matriels[i])
      this.voir1=true
      this.tous1=false

      // console.log(this.Matriel)
      return;
      }
      else{
        this.z=this.z+1
        
      }
    }
    if(this.z>0){
      alert("Le nom n'existe pas ou incorrecte")
      return;
    }
   
    

  }
  setMyval1(){

    this.voir1=false
    this.tous1=true
  }
  retourn2():void{

    this.z=0;
    for(var i = 0; i <this.recettes.length; i++){
      if((this.recettes[i].jour==this.getForm.value.jour)){
    
        this.recettess.push(this.recettes[i]);
  
      this.voir2=true
      this.tous2=false
  
      // console.log(this.recettess)
      return;
      }
      else{
        this.z=this.z+1
        
      }
    }
    if(this.z>0){
      alert("Le jour n'existe pas ou incorrecte")
      return;
    }
   
   
    
  
  }
  setMyval2(){
  
    this.voir2=false
    this.tous2=true
  }
 
  }

