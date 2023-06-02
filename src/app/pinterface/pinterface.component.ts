import { ChangeDetectorRef, Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../model/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Med, Patient, register } from '../model/user';
import {  ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pinterface',
  templateUrl: './pinterface.component.html',
  styleUrls: ['./pinterface.component.css']
})
export class PinterfaceComponent {
  @ViewChild('heureInput') heureInput!: ElementRef;

  addForm: FormGroup;
  patients: Med[] = [];
  errorMessage: string = '';
  pinterface_id:any ;
  nomprenom:any
  email:any
  tel:any
  loc:any
  patient: any;
date:any
conditions:any
heure:any
msg:any
sexe:any
pi:any
voir
n:any
o:any
act:any
 timepicked:any[]=[]
pinterface:any[]=[]
dates:any
currentUrl:any
   isHourDisabled=true;
   x: string =''
   constructor(
    private appComponent: AppComponent,
    private http: HttpClient,
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
     private url :ActivatedRoute,
     private router:Router
  ) {
    this.voir=false
    this.n=''
    this.o=''
    this.addForm = this.formBuilder.group({
      id: [],
      date: ['', Validators.required],
      heure: ['', Validators.required],

      conditions: ['', Validators.required],
      msg: ['', Validators.required]
    });
   
  }

  ngOnInit(): void {
  
  
    this.appComponent.hideHeaderAndFooter = true;
    this.service.getpinterface().subscribe((result: any) => {
      this.pinterface = result.data;
      console.log(this.pinterface);
    
      // Disable the hour input if the same time value of hours appears three times for the same date
     
      let count = 0;
      // console.log(hour);
      
      let hour = this.addForm.get('heure');
if (hour) {
  for (let i = 0; i < this.pinterface.length; i++) {
    if (this.pinterface[i].date === this.pinterface[i+1].date && this.pinterface[i].heure === this.pinterface[i+1].heure) {
      count++;
      
      if (count === 3) {
        console.log(count)
        // hour.disable({value: this.pinterface[i].heure});
        console.log(this.pinterface[i].heure)
        this.timepicked.push(this.pinterface[i].heure)
        console.log(this.timepicked)
        this.dates=this.pinterface[i].date
        console.log( this.dates)
       
      }
    }
  }
}

    });





          this.pinterface_id=this.url.snapshot.params['id'];
  
          if (this.pinterface_id > 0){
            this.service.getSignlpinterface(this.pinterface_id).subscribe((data:any)=>{
              this.addForm.patchValue(data.data)
                 
              this.patients=data.data
              this.patient=this.patients
              // console.log(this.patient)
              this.pi=this.patient.id
              this.nomprenom=this.patient.username
              this.date=this.patient.date
              this.heure=this.patient.heure
              this.msg=this.patient.msg
              this.conditions=this.patient.conditions

              this.loc=this.patient.loc
              this.sexe=this.patient.sexe

              this.tel=this.patient.tel
              this.email=this.patient.email
              this.act=this.patient.action

              if(this.patient.conditions!=''){

                this.voir=true
               }
             
             
                if ((this.route.snapshot.url.join('/').length) > 15) {
                  this.o = true;
                  this.n = false;
                  console.log("o"+ this.o)
                  console.log("n"+ this.n)
                } else if ((this.route.snapshot.url.join('/').length) >= 13) {
                  this.o = false;
                  this.n = true;
                  console.log("o"+ this.o)
                console.log("n"+ this.n)
                }})
                // console.log('Current URL:', this.route.snapshot.url.join('/').length);

              
            console.log(this.patient.id)

           
          }
        

  }
  
  

  ajout() {
  //  console.log(this.dates)
   for (let i = 0; i < this.timepicked.length; i++) {
    if (this.addForm.value.heure +':00'==this.timepicked[i]&&this.addForm.value.date==this.dates){
      
      this.errorMessage = 'L’heure est déjà choisie';
      return;
    }}
    if ((this.addForm.value.date=='') || (this.addForm.value.heure=='') || (this.addForm.value.conditions=='') || (this.addForm.value.msg=='')) {
      alert('champs obligatoires');
      
    } else { if(this.o==true) {
      this.service.ajouterpinterface(this.addForm.value).subscribe(
        (data: any) => {
          alert('Vos données sont enregistrées.');
          console.log(data)
         

            this.voir=true
         
            this.router.navigate(['/pinterface/'+this.pi])
           
            

        
         
          this.addForm.reset();
          this.cdr.detectChanges();
        },
        error => {
          alert('echec de modification.');
        }
      );
    
     
    
        }
        else  {
          this.service.ajouterpinterface(this.addForm.value).subscribe(
            (data: any) => {
              alert('   patient modifier.');
              console.log(data)
             
    
                this.voir=true
             
                this.router.navigate(['/pinterface/'+this.pi+'/'+this.pi])
                  this.o=''
            
             
              this.addForm.reset();
              this.cdr.detectChanges();
            },
            error => {
              alert('echec de modification.');
            }
          );


      
         }
        }
      //  this.o=false
      //  this.n=true
      }


    // if (this.addForm.invalid) {
    //   alert('Please fill all required fields.');
    //   return;
    // }

    // this.service.ajouterpinterface(this.addForm.value).subscribe(
    //   () => {
    //     alert('Patient added successfully.');
    //   //  console.log(this.addForm.value);
    //     this.addForm.reset();
    //     this.cdr.detectChanges();
    //   },
    //   error => {
    //     this.errorMessage = 'An error occurred while adding the patient.';
    //   }
    // );
  }

