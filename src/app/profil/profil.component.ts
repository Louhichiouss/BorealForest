import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { MoveEventParams, ServiceService } from '../model/service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { admin } from '../model/user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  addForm: any;
  admin_id: any;
  admin: admin[] = [];
  imageUrl: any; 
  imageur:any;
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
    this.addForm = this.formbuilder.group({
      id:[],
      nom:['',Validators.required],
      prenom:['',Validators.required],
      tel:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
    });
  }


 

  



  
      
   
    
    
    
    
     

      

      

  ngOnInit(): void {

    fetch('http://localhost/api/AngularImageUpload/viewImage.php')
  .then(response => response.json())
  .then((data: { image_names: string }) => {
    const imageUrl = `http://localhost/api/AngularImageUpload/uploads/${data.image_names}`;
   
    this.imageur=imageUrl
    console.log(this.imageur);
    // Use the imageUrl variable to display the image or perform other operations
  })
  .catch(error => {
    console.error('Error retrieving image URL:', error);
  });
    this.appcomponent.hideHeaderAndFooter = true;

    this.service.getprofil().subscribe((result:any)=>{
      this.admin = result.data;
       
      console.log(this.admin);
      this.addForm.patchValue(this.admin);
 
    });
   
    this.admin_id = 1;
  
    if (this.admin_id > 0){
      this.service.getSignladmin(this.admin_id).subscribe((data:any)=>{
        this.addForm.patchValue(data.data);
      });
    }
  
        
  this.service.getpinterface().subscribe((result: any) => {
    this.patients = result.data;
    // console.log(this.patients);
  

  this.am=this.patients.length
  // console.log(this.am)

});


  }}
