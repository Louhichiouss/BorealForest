import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../model/service.service';
import { depense } from '../model/user';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {
  voir
  tous
  depensess : depense []=[];
  addForm:any
  depenses : depense []=[];
  getForm:any
  depense_id:any;

  c:any;
  
  d:any;
  de:any;
  da:any;
  j:any;
  x:any;

  sum:any;
  z:any
  re:any
  constructor(private appcomponent:AppComponent,private http:HttpClient,private service:ServiceService
     ,private formbuilder:FormBuilder , private router:Router, private cdr:ChangeDetectorRef , 
    private url :ActivatedRoute
    ) {
      this.getForm=this.formbuilder.group({
    
        jour:['',Validators.required],
      
        
    
    
    
      })
      this.voir=false
      this.tous= true
    this.addForm = this.formbuilder.group({
      id:[],
    depense:['',Validators.required],
    description:['',Validators.required],

      date:['',Validators.required],
      jour:['',Validators.required],

  region:['',Validators.required],
  
     
  
  
  
  
    
    })
    }

ngOnInit(): void {
  this.appcomponent.hideHeaderAndFooter = true;
    
  this.service.getdepense().subscribe(
    (result:any)=>{
      this.depenses=result.data
   
 

    }),
  this.depense_id=this.url.snapshot.params['id'];
  if (this.depense_id> 0) {
    this.service.getSignledepense(this.depense_id).subscribe((data:any) => {
      // console.log(data.data) 
      this.addForm.patchValue(data.data)
      this.c = (data.data)
      this.de = this.c.depense
 
      this.d = this.c. description
      this.da = this.c.date
      this.j = this.c.jour
      this.re = this.c.region
    });
  }
  console.log(this.c)
}

retourn(): void {
  this.depensess = [];

  for (var i = 0; i < this.depenses.length; i++) {
    if (this.depenses[i].jour === this.getForm.value.jour) {
      this.depensess.push(this.depenses[i]);
    }
  }

  if (this.depensess.length > 0) {
    this.voir = true;
    this.tous = false;
    console.log(this.getForm.value.jour);
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
  if ((this.addForm.value.depense=='') || (this.addForm.value.description=='')   || (this.addForm.value.date=='')|| (this.addForm.value.jour=='') || (this.addForm.value.region=='') ) {
    alert('champs obligatoires');
  } 
   
     else { 
      this.service. ajouterdepense(this.addForm.value).subscribe(
        (data: any) => {
          alert(' adding the depense.');
             console.log(this.addForm.value)
        
         
          this.addForm.reset();
          this.cdr.detectChanges();
        },
        error => {
          alert('An error occurred while adding the depense.');
        }
      );
    }

}
Deletedepense(dep:any){
  const confirmation = window.confirm("Voulez-vous vraiment supprimer ce depense?");
    if (confirmation) {
    // console.log(id)
    this.service. Deletedepense(dep.id).subscribe(data=>{
  
  
      this.depenses=this.depenses.filter((u: any)=> u!==dep);
  
  
    })
}
}
edit(){
  if ((this.addForm.value.depense=='') || (this.addForm.value.description=='')   || (this.addForm.value.date=='')|| (this.addForm.value.jour=='') || (this.addForm.value.region=='') ) {
    alert('champs obligatoires');
  } else {
  

   { 
      this.service.editdepense(this.addForm.value).subscribe(
        (data: any) => {
          alert(' adding the depense.');
          // console.log(data)
        
         
          this.addForm.reset();
          this.cdr.detectChanges();
        },
        error => {
          alert('An error occurred while adding the depense.');
        }
      );
    }
  }
  }

}
