import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BorealForest';
  // estVisible: boolean = false;
  hideHeaderAndFooter=false
   
  constructor(private router:Router){


  }

  ngOnInit(): void {
    // let a = window.location.href 
    // let b = window.location.origin +'/' 

    //   // b=b+'/'
   
    
  
 
    //   console.log(b)

    
    // console.log(a)
  //  if(this.router.navigateByUrl('/')==true) 
//  this.estVisible=true
//  console.log(window.location.origin)
  }//


}
