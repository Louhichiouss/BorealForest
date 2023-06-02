import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  lastScrollTop=0 ;
  navbar = document.getElementById("navbar")
  // scroll =  window.pageYOffset || document.documentElement.scroll
  estVisible: boolean = true;
  constructor() { }

  ngOnInit(): void {
    
   

    
    if (document.body.scrollTop> 0 ){
      this.estVisible=true
    }
    else {
      this.estVisible=false
      }

    
   }
  

}
