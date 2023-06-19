import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../model/service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { recette } from '../model/user';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent  implements OnInit{
  voir
  tous
recettes :recette []=[];

addForm:any
c:any;
r:any;
d:any;
de:any;
da:any;
j:any;
trr:any =[];
trrr:any =[];
sum:any;
z:any
re:any
recette_id:any;
  /////////
  getForm:any
  recettess:recette []=[];
  ////////
x:any;
cdr:any;
  am: any;
  patients: any;
  s: any;
constructor(private appcompant:AppComponent,private http:HttpClient,     private url :ActivatedRoute
,  private service:ServiceService ,private formbuilder:FormBuilder, private router:Router){

  this.getForm=this.formbuilder.group({
    
    jour:['',Validators.required],
  
    



  })

  this.voir=false
    this.tous= true
  this.addForm = this.formbuilder.group({
    id:[],
    recette:['',Validators.required],
    
    date:['',Validators.required],
    jour:['',Validators.required],
      
region:['',Validators.required],

   




  
  })

}

ngOnInit(): void {
  this.appcompant.hideHeaderAndFooter=true;
  
  
  this.service.getrecette().subscribe(
    (result:any)=>{
      this.recettes=result.data
   
 

    }),
  this.recette_id=this.url.snapshot.params['id'];

//  console.log (this.recette_id)
if (this.recette_id > 0) {
  this.service.getSignlerecette(this.recette_id).subscribe((data:any) => {
    // console.log(data.data) 
    this.addForm.patchValue(data.data)
    this.c = (data.data)
    this.r = this.c.recette

    this.da = this.c.date
    this.j = this.c.jour
    this.re = this.c.region
  });
}

       
this.service.getpinterface().subscribe((result: any) => {
  this.patients = result.data;
  // console.log(this.patients);


this.am=this.patients.length
// console.log(this.am)

});

}

retourn(): void {
  this.recettess = [];

  for (var i = 0; i < this.recettes.length; i++) {
    if (this.recettes[i].jour === this.getForm.value.jour) {
      this.recettess.push(this.recettes[i]);
    } 
  }

  if (this.recettess.length > 0) {
    this.voir = true;
    this.tous = false;
    console.log(this.recettess);
  } else {
    alert("Le jour n'existe pas ou est incorrect");
  }
}

setMyval(): void {
  this.voir = false;
  this.tous = true;
}

ajout(){
  // console.log(this.addForm.value);
  if ((this.addForm.value.recette=='')   || (this.addForm.value.date=='')|| (this.addForm.value.jour=='') || (this.addForm.value.region=='') ) {
    alert('champs obligatoires');
  } 
   
     else { 
      this.service.ajouterrecette(this.addForm.value).subscribe(
        (data: any) => {
          alert(' adding the recette.');
             console.log(this.addForm.value)
        
         
          this.addForm.reset();
          this.cdr.detectChanges();
        },
        error => {
          alert('An error occurred while adding the recette.');
        }
      );
    }
  }
  Deleterecette( rec:any){
    const confirmation = window.confirm("Voulez-vous vraiment supprimer ce matriéls?");
    if (confirmation) {
    // console.log(id)
    this.service. Deleterecette(rec.id).subscribe(data=>{
  
  
      this.recettes=this.recettes.filter((u: any)=> u!==rec);
  
  
    })

}

  }
  edit(){
    if ((this.addForm.value.recette=='') || (this.addForm.value.depense=='') || (this.addForm.value.description=='')  || (this.addForm.value.date=='')|| (this.addForm.value.jour=='') || (this.addForm.value.region=='') ) {
      alert('champs obligatoires');
    } else {
    
  
     { 
        this.service.editrecette(this.addForm.value).subscribe(
          (data: any) => {
            alert(' adding the recette.');
            // console.log(data)
          
           
            this.addForm.reset();
            this.cdr.detectChanges();
          },
          error => {
            alert('An error occurred while adding the recette.');
          }
        );
      }
    }
  
  }
  

}




