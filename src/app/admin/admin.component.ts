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
  chart2: any;
  xaxis2:any;
  dataLabels2: any;
  grid2: any;
  stroke2:any;
  title2: any;
  series22: any;
  series11: any;
  chart1: any;
  xaxis1:any;
  dataLabels1: any;
  grid1: any;
  stroke1:any;
  title1: any;
/**********************************************************DEpence souse et tunis */
chart3: any;
  xaxis3:any;
  dataLabels3: any;
  grid3: any;
  stroke3:any;
  title3: any;
  series3: any;

  series4: any;
  chart4: any;
  xaxis4:any;
  dataLabels4: any;
  grid4: any;
  stroke4:any;
  title4: any;
  depenses:any;
/******************************************************************************** */
// the reccette  month value
totalRecette:any;
totalDepence:any;
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
  Dp:number=0;
  Aut:number=0;
  /************************************************ */
  Sbs:number=0;
  Pfs:number=0;
  Mis:number=0;
  Avcs:number=0;
  Pds:number=0;
  Cas:number=0;
  Rcps:number=0;
  Bes:number=0;
  Aus:number=0;
  Dps:number=0;
  Auts:number=0;

  /*********************************************** */
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
  month:any



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
       
    // Get the current month
const currentDate = new Date();
const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

// Log the current month to the console
console.log(currentMonth);

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
    this.service.getdepense().subscribe(
      (result:any)=>{
        this.depenses=result.data

        this.dayofweek = [];
        const currentDate = new Date();
        const currentWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
        const currentWeekEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 6);
        for (let i = 0; i < this.depenses.length; i++) {
          const date = new Date(this.depenses[i].date);
          if (date >= currentWeekStart && date <= currentWeekEnd) {
            const day = date.toLocaleDateString('fr', { weekday: 'long' });
            this.dayofweek.push(day);
            // console.log(`${this.recettes[i].date} est un ${day}`);
            // console.log(this.recettes[i].beneficie)
          }
        }

        const dataArr1 = [0, 0, 0, 0, 0, 0, 0]; // depence tunis
        const dataArr2 = [0, 0, 0, 0, 0, 0, 0];  //depence sousse
        for (let i = 0; i < this.depenses.length; i++) {
          const date = new Date(this.depenses[i].date);
          const depence = parseFloat(this.depenses[i].depense);
          console.log(this.depenses[i].depense)
          if (date >= currentWeekStart && date <= currentWeekEnd) {
            if(this.depenses[i].region== "Tunis")
            {    const dayIndex = date.getDay();
            dataArr1[dayIndex] += depence;}


            else if(this.depenses[i].region== "Sousse")
            {    const dayIndex = date.getDay();
            dataArr2[dayIndex] += depence;
            // console.log(dataArr2[dayIndex])
          }

        
          // console.log(dataArr1)
            
          }
        }
 
         /***************************************************** depece tunis */
       this.series3 = [
        {
          name: 'Depence',
          data: dataArr1
        }
      ];
  
      this.chart3 = {
        height: 350,
        width: 500,
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
  
      this.xaxis3= {
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
  
      this.dataLabels3= {
        enabled: true
      };
  
      this.grid3 = {
        row: {
          colors: ['black', 'transparent'],
          opacity: 0.5
        }
      };
  
      this.stroke3 = {
        curve: 'straight'
      };
   // Calculate the week number
   const weekNumber = Math.ceil((currentWeekEnd.getDate() - currentWeekStart.getDate() + 1) / 7);
   // Get the month and year of the current week
   const month = currentWeekStart.toLocaleDateString('fr', { month: 'long' });
   const year = currentWeekStart.getFullYear();
      this.title3 = {
        text: `Depense de  semaine ${weekNumber} dans ${month} à Tunis ${year}`,
        align: 'centre'
      };
       /*********************************************************** */


       /*********************depence sousse****************************** */

       this.series4 = [
        {
          name: 'Depence',
          data: dataArr2
        }
      ];
  
      this.chart4 = {
        height: 350,
        width: 500,
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
  
      this.xaxis4 = {
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
  
      this.dataLabels4= {
        enabled: true
      };
  
      this.grid4 = {
        row: {
          colors: ['black', 'transparent'],
          opacity: 0.5
        }
      };
  
      this.stroke4 = {
        curve: 'straight'
      };
  
      this.title4 = {
        text: `Depense de  semaine ${weekNumber} dans ${month} à Sousse ${year}`,
        align: 'centre'
      };


       /**************************************************** */
   
  
      }),
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
        const dataArr = [0, 0, 0, 0, 0, 0, 0];  //recette tunis
         const dataArrS = [0, 0, 0, 0, 0, 0, 0]; // recette sousse
       
    
        // Loop through the recipes and add the benefice to the appropriate day of the week
        for (let i = 0; i < this.recettes.length; i++) {
          const date = new Date(this.recettes[i].date);
          const benefice = this.recettes[i].recette;
          // console.log(benefice)
          if (date >= currentWeekStart && date <= currentWeekEnd) {
            if(this.recettes[i].region== "Tunis")
            {    const dayIndex = date.getDay();
            dataArr[dayIndex] += benefice;}


            else if(this.recettes[i].region== "Sousse")
            {    
              
            const dayIndex = date.getDay();
            dataArrS[dayIndex] += benefice;
          
          }


           
           
          }
        }
    
        // Set the chart data to the array we just built
        this.series11 = [
          {
            name: 'Recette',
            data: dataArr
            
          }
        ];
    
        this.chart1 = {
          height: 350,
          width: 500,
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
       // Calculate the week number
   const weekNumber = Math.ceil((currentWeekEnd.getDate() - currentWeekStart.getDate() + 1) / 7);
   // Get the month and year of the current week
   const month = currentWeekStart.toLocaleDateString('fr', { month: 'long' });
   const year = currentWeekStart.getFullYear();
        this.title1 = {
          text: `Recette de semaine ${weekNumber} dans  ${month} à Tunis ${year}`,
          align: 'centre'
        };


       //******************************************************* */

      
       this.series22 = [
        {
          name: 'Recette',
          data: dataArrS
        }
      ];
  
      this.chart2 = {
        height: 350,
        width: 500,
        
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
  
      this.xaxis2 = {
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
  
      this.dataLabels2= {
        enabled: true
      };
  
      this.grid2 = {
        row: {
          colors: ['black', 'transparent'],
          opacity: 0.5
        }
      };
  
      this.stroke2 = {
        curve: 'straight'
      };
  
      this.title2 = {
        text: `Recette de semaine ${weekNumber} dans  ${month} à Sousse ${year}`,
        align: 'centre'
      };

        
  //**************************************************** */

      }
    );
    
  }
 
  ngOnInit(): void {
    
 //pour calculer la depence du moins
 
 this.service.getdepense().subscribe(
  (result:any)=>{
    this.depenses=result.data
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
   this.totalDepence = 0;

    for (let i = 0; i < this.depenses.length; i++) {
      const recetteDate = new Date(this.depenses[i].date);
      const recetteMonth = recetteDate.getMonth();

      if (recetteMonth === currentMonth) {
        const recetteAmount = this.depenses[i].depense;
       this.totalDepence += recetteAmount;
      }
    }
    console.log(this.totalDepence)

  
  
  
  
  
  
  })
 // pour calculer recette du cette moins 


 this.service.getrecette().subscribe(
  (result: any) => {
    this.recettes = result.data;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
   this.totalRecette = 0;

    for (let i = 0; i < this.recettes.length; i++) {
      const recetteDate = new Date(this.recettes[i].date);
      const recetteMonth = recetteDate.getMonth();

      if (recetteMonth === currentMonth) {
        const recetteAmount = this.recettes[i].recette;
       this.totalRecette += recetteAmount;
      }
    }

    // console.log('Total Recette:', this.totalRecette);
  });

 /*************************************************** */

  
    this.appcomponent.hideHeaderAndFooter=true;

      this.service.getdate().subscribe(
        (result:any)=>{
          this.events=result.data
          // console.log(result.data)
          this.e=this.events.length

        }
      )


      const currentDate = new Date();
    const currentMonthName = currentDate.toLocaleString('fr-FR', { month: 'long' });
    // console.log(currentMonthName);
    
    this.month = currentMonthName;
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
if ((this.patient[i].P_c=='Autisme'&& this.patient[i].P_region=='Tunis') ) {
 
 this.Au=this.Au+1
 
} if((this.patient[i].P_c=='pour le bien être'&& this.patient[i].P_region=='Tunis') ) {
   this.Be=this.Be+1
   
   

}if((this.patient[i].P_c=='Retablissement'&& this.patient[i].P_region=='Tunis') ) {

  this.Rcp=this.Rcp+1
  


}if((this.patient[i].P_c=='Cancer'&& this.patient[i].P_region=='Tunis') ) {

  this.Ca=this.Ca+1


}if((this.patient[i].P_c=='plaies diabétique'&& this.patient[i].P_region=='Tunis') ) {


  this.Pd=this.Pd+1

}
if((this.patient[i].P_c=='AVC'&& this.patient[i].P_region=='Tunis') ) {


  this.Avc=this.Avc+1

}
if((this.patient[i].P_c=='Migrane'&& this.patient[i].P_region=='Tunis') ) {


  this.Mi=this.Mi+1

}
if((this.patient[i].P_c=='Surdite brusque'&& this.patient[i].P_region=='Tunis') ) {


  this.Sb=this.Sb+1

}
if((this.patient[i].P_c=='Paralysie faciale'&& this.patient[i].P_region=='Tunis') ) {


  this.Pf=this.Pf+1

}
if((this.patient[i].P_c=='Dépression'&& this.patient[i].P_region=='Tunis') ) {


  this.Dp=this.Dp+1

}
if((this.patient[i].P_c=='Autre'&& this.patient[i].P_region=='Tunis') ) {


  this.Aut=this.Aut+1

}
/***** */
if ((this.patient[i].P_c=='Autisme'&& this.patient[i].P_region=='Sousse') ) {
 
  this.Aus=this.Aus+1
  
 } if((this.patient[i].P_c=='pour le bien être'&& this.patient[i].P_region=='Sousse') ) {
    this.Bes=this.Bes+1
    
    
 
 }if((this.patient[i].P_c=='Retablissement'&& this.patient[i].P_region=='Sousse') ) {
 
   this.Rcps=this.Rcps+1
   
 
 
 }if((this.patient[i].P_c=='Cancer'&& this.patient[i].P_region=='Sousse') ) {
 
   this.Cas=this.Cas+1
 
 
 }if((this.patient[i].P_c=='plaies diabétique'&& this.patient[i].P_region=='Sousse') ) {
 
 
   this.Pds=this.Pds+1
 
 }
 if((this.patient[i].P_c=='AVC'&& this.patient[i].P_region=='Sousse') ) {
 
 
   this.Avcs=this.Avcs+1
 
 }
 if((this.patient[i].P_c=='Migrane'&& this.patient[i].P_region=='Sousse') ) {
 
 
   this.Mis=this.Mis+1
 
 }
 if((this.patient[i].P_c=='Surdite brusque'&& this.patient[i].P_region=='Sousse') ) {
 
 
   this.Sbs=this.Sbs+1
 
 }
 if((this.patient[i].P_c=='Paralysie faciale'&& this.patient[i].P_region=='Sousse') ) {
 
 
   this.Pfs=this.Pfs+1
 
 }
 if((this.patient[i].P_c=='Dépression'&& this.patient[i].P_region=='Sousse') ) {
 
 
   this.Dps=this.Dps+1
 
 }
 if((this.patient[i].P_c=='Autre'&& this.patient[i].P_region=='Sousse') ) {
 
 
   this.Auts=this.Auts+1
 
 }











}

this.chartSeriess = [this.Pfs, this.Sbs, this.Mis, this.Avcs, this.Pds, this.Cas, this.Rcps, this.Bes, this.Aus, this.Dps, this.Auts];
this.chartSeries = [this.Pf, this.Sb, this.Mi, this.Avc, this.Pd, this.Ca, this.Rcp, this.Be, this.Au, this.Dp,this.Aut];
this.series11 = [1,2,3,4,6,9,8];
this.series22 = [1,2,3,4,6,9,8];

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
        for (let i = 0; i < this.recettes.length; i++) {
          // this.tr.push(this.recettes[i].beneficie.toString());
        // this.sum=this.sum+this.tr
        }
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
    width: 490,
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
  chartLabels = ["Paralysie faciale", "Surdite brusque", "Migrane", "AVC", "plaies diabetique", "Cancer", "Retablissement", "pour le bien être", "Autisme","Dépression","Autre"];

  chartTitle: ApexTitleSubtitle = {
    text: 'Etat Santé de patient "Tunis"',
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


/*************************************************************** */

title6 = 'apex-ng-14';
chartSeriess: ApexNonAxisChartSeries = [];
chartDetailss: ApexChart = {
  width: 490,
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
chartstrokee:ApexStroke={
  width: 0

};
chartfills: ApexFill = {
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

chartplotOptionss:ApexPlotOptions={

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
chartstatess:ApexStates={
  hover: {
    filter: {
      type: "none"
    }
  }
};


chartthemee:ApexTheme={
  palette: "palette2"
}
chartLabelss = ["Paralysie faciale", "Surdite brusque", "Migrane", "AVC", "plaies diabetique", "Cancer", "Retablissement", "pour le bien être", "Autisme","Dépression","Autre"];

chartTitles: ApexTitleSubtitle = {
  text: 'Etat Santé de patient "Sousse"',
  align: 'center'
};
chartresponsives: ApexResponsive[] = [
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


chartDataLabelss: ApexDataLabels = {
  enabled: true
  
};




/************************************************************************ */

  retour():void{

    this.z=0 
    for(var i = 0; i <this.patient.length; i++){
      if((this.patient[i].P_tel==this.getForm.value.P_tel)){
    
      this.patient11=(this.patient[i])
      this.voir=true
      this.tous=false

      // console.log(this.patient11+"ddfdffddf")
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
