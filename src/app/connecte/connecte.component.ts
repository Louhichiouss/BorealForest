import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../model/service.service';
import { Med, admin } from '../model/user';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-connecte',
  templateUrl: './connecte.component.html',
  styleUrls: ['./connecte.component.css']
})
export class ConnecteComponent {
  [x: string]: any;
 addForm:any
 med:Med []=[]
 hideHeaderAndFooter=false
 x=''
 errorMessage: string = '';
 errorMessage1: string = '';
 errorMessage3: string = '';
  showLoginForm: boolean = true;
  admin:admin[]=[]
  constructor(     private appcomponent: AppComponent
    ,private service:ServiceService , private router:Router , private formbuilder:FormBuilder) { 
  this.addForm=this.formbuilder.group({
    id:[],
    username:['',Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
    tel:['',Validators.required],
    loc:['',Validators.required],
    sexe:['',Validators.required],
    mp: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z0-9])(?=.*[A-Za-z])[A-Za-z\d]{8,}$')]],
    cmp: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z0-9])(?=.*[A-Za-z])[A-Za-z\d]{8,}$')]],
  });
}
  ngOnInit(): void {
    this.appcomponent.hideHeaderAndFooter = false;

    this.service.getprofil().subscribe(
      (result:any)=>{
        this.admin=result.data
     
        console.log(this.admin)
    
  
  
      }
  
    )


    this.service.getMed().subscribe(
      (data : any )=> {this.med=data.data;})
  }


  
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    }
    ajout() {
      this.errorMessage = '';

      if (this.addForm.get('email').invalid) {
        this.errorMessage = 'Veuillez saisir une adresse e-mail valide.';
        return;
      }
      this.errorMessage1 = '';

      if (this.addForm.value.tel.length > 8) {
        this.errorMessage1 = 'Veuillez saisir un format de numéro de téléphone valide.';
        return;
      }
      this.errorMessage3 = '';

      if (this.addForm.value.mp !== this.addForm.value.cmp) {
        this.errorMessage3 = 'Les mots de passe doivent correspondre.';
        return;
      }
      
      if (this.addForm.value.email === '' || this.addForm.value.mp === '') {
        alert('Champs obligatoires');
        return;
      } else {
        for (let i = 0; i < this.med.length; i++) {
          if (this.med[i].email == this.addForm.value.email) {
            this.x = 'yes';
          }
        }
        
        if (this.x == 'yes') {
          alert('Email est déjà utilisée');
        } else {
          console.log(this.addForm.value);
          this.service.ajouterMed(this.addForm.value).subscribe(
            (data: any) => {
              alert("L'inscription a réussi.");
              this.router.navigate(['/connecte/'+1]);
            },
            error => {
              alert('An error occurred while adding the patient.');
            }
          );
        }
      }
      
      // Reset error messages
      this.x = '';
    }
    
    login(){
      
      
       // Check if user is admin
     if (this.addForm.value.email === this.admin[0].email && this.addForm.value.mp === this.admin[0].password) {
      console.log(this.admin[0].email);
      this.router.navigate(['/admin'])
      return;
        }

      
      
      if (this.addForm.get('email').invalid) {
        
        alert('Veuillez saisir une adresse e-mail valide.');
        return;
      }
      for (let i = 0; i < this.med.length; i++) {

        if((this.med[i].email==this.addForm.value.email)&& (this.med[i].mp==this.addForm.value.mp) ){
          
          
          this.router.navigate(['/pinterface/'+this.med[i].id])
          this.x='yes'
        
          
        }
    
         }
             
     
        if(this.x!='yes'){
          alert(" mot de passe ou email incorrect")
  
  
  
        }
        this.x = '';
    }
  

  
  }
