
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ServiceService } from '../model/service.service';
import { Patient } from '../model/user';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patients :Patient[]=[];
  voir
  tous
  addForm:any
patient_id:any ;
   getForm:any
   patient1:any=[]
   ////////
  c:any;
  n:any;
  p:any;
  t:any;
  e:any;
  r:any;
  cc:any;
  s:any;
  nb:any;
  nbt:any;
  pt:any;
am:any
z:any
  patientss: any;
  x: any;
  patient: any;
  
  constructor(private appcompant:AppComponent,private http:HttpClient,private service:ServiceService ,private formbuilder:FormBuilder , private router:Router, private cdr:ChangeDetectorRef , 
    private url :ActivatedRoute
    ) {
       
    this.getForm=this.formbuilder.group({
    
      P_tel:['',Validators.required],
    
      



    })
    this.voir=false
    this.tous= true
    this.addForm = this.formbuilder.group({
      P_id:[],
      P_nom:['',Validators.required],
      P_prenom:['',Validators.required],
      P_tel:['',Validators.required],
      P_email: ['', [Validators.required, Validators.email]],
      P_region:['',Validators.required],
      P_c:['',Validators.required],
      P_sexe:['',Validators.required],
      P_nbs:['',Validators.required],
      P_n:['',Validators.required],

      P_pt:['',Validators.required],





    
    })
  }

  




    ngOnInit(): void {
      this.appcompant.hideHeaderAndFooter=true;
    
      this.service.getpatient().subscribe(
        (result:any)=>{
          this.patients=result.data
      
          // console.log(this.patients)
        }

      )
      this.patient_id=this.url.snapshot.params['id'];
  
    // console.log (this.patient_id)
    if (this.patient_id>0){
this.service.getSignlePatient(this.patient_id).subscribe((
  (data:any)=>{
    // console.log(data.data) 
    this.addForm.patchValue(data.data)
    this.c=(data.data)
    console.log(this.c)
    this.n=this.c.P_nom
    this.p=this.c.P_prenom
    this.t=this.c.P_tel
    this.e=this.c.P_email
    this.r=this.c.P_region
    this.cc=this.c.P_c
    this.s=this.c.P_sexe
    this.nb=this.c.P_nbs
    this.nbt=this.c.P_n

    this.pt=this.c.P_pt



  }
))

    }

     
    this.service.getpinterface().subscribe((result: any) => {
      this.patientss = result.data;
      // console.log(this.patients);
    

    this.am=this.patientss.length
    // console.log(this.am)

  });

    }
    retour():void{
      this.z=0
      for(var i = 0; i <this.patients.length; i++){
        if((this.patients[i].P_tel==this.getForm.value.P_tel)){
      
        this.patient1=(this.patients[i])
        this.voir=true
        this.tous=false
  
        // console.log(this.patient1+"ddfdffddf")
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
    
    ajout() { 
    
      if (this.addForm.get('P_email').invalid) {
        alert('Veuillez saisir une adresse e-mail valide.');
        return;
      }
//       console.log(this.addForm.value.P_tel.length)
      if (this.addForm.value.P_tel.length>8) {
        alert('Veuillez saisir une format de numéro de téléphone valide.');
        return;
      }
    
      if ((this.addForm.value.P_nom=='') || (this.addForm.value.P_prenom=='') || (this.addForm.value.P_tel=='') ||(this.addForm.value.P_email=='') || (this.addForm.value.P_region=='') || (this.addForm.value.P_c=='')|| (this.addForm.value.P_sexe=='')  || (this.addForm.value.P_pt=='')) {
        alert('champs obligatoires');
      } else {
         for(var i = 0; i <this.patients.length; i++){
          if (this.patients[i].P_tel==this.addForm.value.P_tel) {
            this.x='yes';
            console.log(this.addForm.value.P_tel)
          }
          

        }
        if (this.x=='yes') {
          alert("numero téléphone  est déjà utilisée");
        } else { 
          this.service.ajouterpatient(this.addForm.value).subscribe(
            (data: any) => {
              alert(' ajout patient.');
            
             
              this.addForm.reset();
              this.cdr.detectChanges();
            },
            error => {
              alert('ajouter annuler.');
            }
          );
        }
      }
      this.x='';
      this.router.navigate(['/patient'], { skipLocationChange: true }).then(() => {
        this.router.navigate([this.router.url]);
      });
    }
    
    
    
    
    
    
   
    status = false;
    addToggle()
    {
      this.status = !this.status;       
    }



    DeletePatient( pat:any){
      const confirmation = window.confirm("Voulez-vous vraiment supprimer ce patient ?");
      if (confirmation) {
      // console.log(id)
      this.service. DeletePatient(pat.P_id).subscribe(data=>{


        this.patients=this.patients.filter((u: any)=> u!==pat);

 
      })


    }}
  edit(){
    if (this.addForm.get('P_email').invalid) {
      alert('Veuillez saisir une adresse e-mail valide.');
      return;
    }
    if (this.addForm.value.P_tel.length>8) {
      alert('Veuillez saisir une format de numéro de téléphone valide.');
      return;
    }
  
    if ((this.addForm.value.P_nom=='') || (this.addForm.value.P_prenom=='') || (this.addForm.value.P_tel=='') ||(this.addForm.value.P_email=='') || (this.addForm.value.P_region=='') || (this.addForm.value.P_c=='')|| (this.addForm.value.P_sexe=='') || (this.addForm.value.P_pt=='')) {
      alert('champs obligatoires');
      return;
    }
    // else {
    //   for (let i = 0; i < this.patient.length; i++) {
    //     if (this.patient[i].P_tel==this.addForm.value.P_tel) {

          
    //     }
    //   }
    //  { 
        this.service.editPatient(this.addForm.value).subscribe(
          (data: any) => {
            alert('   patient modifier.');
            console.log(data)
          
           
            this.addForm.reset();
            this.cdr.detectChanges();
          },
          error => {
            alert('echec de modification.');
          }
        );
      }
    }


