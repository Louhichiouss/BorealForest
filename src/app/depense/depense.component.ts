import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ServiceService } from '../model/service.service';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent {
  constructor(private appcomponent:AppComponent,private http:HttpClient,private service:ServiceService
     ,private formbuilder:FormBuilder , private router:Router, private cdr:ChangeDetectorRef , 
    private url :ActivatedRoute
    ) {}

ngOnInit(): void {
  this.appcomponent.hideHeaderAndFooter = true;
}
}
