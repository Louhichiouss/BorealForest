import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../model/service.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  // estVisible: boolean = false
  constructor(private service:ServiceService ,private router:Router) { }

  ngOnInit(): void {
  //   let a = window.location.href 
  //   let b = window.location.origin +'/' 
    
  //   if(  a==b){
  //     this.estVisible=true

  //   }
  //   if(a!=b) {
  //     this.estVisible=false
   
  // }
 

  }
}
