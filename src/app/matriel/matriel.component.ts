import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../model/service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { matriel } from '../model/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matriel',
  templateUrl: './matriel.component.html',
  styleUrls: ['./matriel.component.css']
})

export class MatrielComponent implements OnInit {
  voir
  tous
  addForm: any;
  Matriels: matriel[] = [];
  Matriels_id: any;
  /////////
  getForm:any
  Matriel:any=[]
  ////////
z:any ;
  c:any;
  n:any;
  d:any;
  q:any;
  p:any;
  da:any;
  patients: any;
  am: any;

  constructor(
    private appcomponent: AppComponent,
    private http: HttpClient,
    private service: ServiceService,
    private formbuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private url: ActivatedRoute
  ) {

    this.getForm=this.formbuilder.group({
    
      Nom:['',Validators.required],
    
      



    })
    this.voir=false
    this.tous= true
    this.addForm = this.formbuilder.group({
      id:[],
      Nom: ['', Validators.required],
      Description: ['', Validators.required],
      Quantite: ['', Validators.required],
      Prix: ['', Validators.required],
      Date: ['', Validators.required]
    });

     
    this.service.getpinterface().subscribe((result: any) => {
      this.patients = result.data;
      // console.log(this.patients);
    

    this.am=this.patients.length
    // console.log(this.am)

  });
  }

 
 
  ngOnInit(): void {
    this.appcomponent.hideHeaderAndFooter = true;
    this.service.getmatriel().subscribe((result: any) => {
      this.Matriels = result.data;
      console.log(this.Matriels);
    });
    this.Matriels_id=this.url.snapshot.params['id'];
  
    // console.log (this.patient_id)
    if (this.Matriels_id>0){
this.service.getSignlematriel(this.Matriels_id).subscribe((
  (data:any)=>{
    // console.log(data.data) 
    this.addForm.patchValue(data.data)
       this.c=(data.data)
        console.log(this.c)
        this.n=this.c.Nom
        this.d=this.c.Description
        this.q=this.c.Quantite
        this.p=this.c.Prix
        this.da=this.c.Date


  }
))

    }



  }

  retourn():void{
      this.z=0

    
    for(var i = 0; i <this.Matriels.length; i++){
      if((this.Matriels[i].Nom==this.getForm.value.Nom)){
    
      this.Matriel=(this.Matriels[i])
      this.voir=true
      this.tous=false

      console.log(this.Matriel)
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
  setMyval(){

    this.voir=false
    this.tous=true
  }
  ajout() {
    // console.log(this.addForm.value);

    if (
      this.addForm.value.Nom == '' ||
      this.addForm.value.Description == '' ||
      this.addForm.value.Quantite == '' ||
      this.addForm.value.Prix == '' ||
      this.addForm.value.Date == ''
    ) {
      alert('champs obligatoires');
    } else {
      this.service.ajoutermatriel(this.addForm.value).subscribe(
        (data: any) => {
          alert('Matriel added successfully.');
          // console.log(this.addForm.value);
        },
        error => {
          alert('An error occurred while adding the matriel.');
        }
      );
    }
  }
  
  Deletematriel( mat:any){
    // console.log(id)
 

 
    const confirmation = window.confirm("Voulez-vous vraiment supprimer ce matriéls?");
    if (confirmation) {
    // console.log(id)
    this.service. Deletematriel(mat.id).subscribe(data=>{
  
  
      this.Matriels=this.Matriels.filter((u: any)=> u!==mat);
  
  
    })

}
  }

edit(){
  if ((this.addForm.value.Nom=='') || (this.addForm.value.Description=='') || (this.addForm.value.Quantite=='') || (this.addForm.value.Prix=='')  || (this.addForm.value.Date=='') ) {
    alert('champs obligatoires');
  } else {
  

   { 
      this.service.editmatriel(this.addForm.value).subscribe(
        (data: any) => {
          alert(' adding the matriel.');
          // console.log(data)
        
         
          this.addForm.reset();
          this.cdr.detectChanges();
        },
        error => {
          alert('An error occurred while adding the matriel.');
        }
      );
    }
  }



}




}
