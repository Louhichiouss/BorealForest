import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../model/service.service';
import { User } from '../model/user';

@Component({
  selector: 'app-contact-nous',
  templateUrl: './contact-nous.component.html',
  styleUrls: ['./contact-nous.component.css']
})
export class ContactNousComponent implements OnInit {
  addForm:any
  users :User[]=[]

  constructor(private service : ServiceService,private formBuilder:FormBuilder ,private router:Router) {
    this.addForm= this.formBuilder.group({
      nom:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel:['',Validators.required],
      msg:['',Validators.required],
    
    })
   }

  ngOnInit(): void {

  }
  ajout(){
    console.log(this.addForm.value);
    if (this.addForm.get('email').invalid) {
      alert('Veuillez saisir une adresse e-mail valide.');
      return;
    }
    if (this.addForm.value.tel.length>8) {
      alert('Veuillez saisir une format de numéro de téléphone valide.');
      return;
    }
    if(this.addForm.value.tel=="" || this.addForm.value.email=="" || this.addForm.value.msg==""|| this.addForm.value.nom==""){
      alert('champs est obligatoire .');
      return;
    }
    
  
    this.service.ajouterUser(this.addForm.value).subscribe(
      (data: any) => {
        // alert(' .');
      },
      error => {
        alert('votre message a été envoyé.');
        this.addForm.reset();
      }
    )
  }
  
}
