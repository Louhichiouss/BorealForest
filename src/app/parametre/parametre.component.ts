import { ChangeDetectorRef, Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { ServiceService } from '../model/service.service';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { admin } from '../model/user';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent {
  addForm: FormGroup;
 admin:admin []=[]
  admin_id:any
  title='ngImageUpload'
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
      img:[null],

  })

  }
  uploadFile(event:any){
  const file = event.target.files ? event.target.files[0]:'';
 
  this.addForm.patchValue({
    img:file
    
  });
  this.addForm.get('img')?.updateValueAndValidity()
  }

  // submitImage(){
  //   this.service.imageUpload(

  //     this.addForm.value.img
  //   ).subscribe((event:HttpEvent<any>)=>
    
  //   {
  //     switch(event.type){

  //     }

  //   }
  //   )   
  
  // }
  
 
  ngOnInit(): void {
    this.appcomponent.hideHeaderAndFooter = true;
    this.service.getprofil().subscribe(
      (result:any)=>{
        this.admin=result.data
        this.admin=result 
        // console.log(this.admin)
        this.addForm.patchValue(this.admin)
  
  
      }
  
    )

    this.admin_id=1;
    
    // console.log (this.patient_id)
    if (this.admin_id>0){
this.service.getSignladmin(this.admin_id).subscribe((
  (data:any)=>{
    this.addForm.patchValue(data.data)



  }
))
    }

           
    this.service.getpinterface().subscribe((result: any) => {
      this.patients = result.data;
      // console.log(this.patients);
    

    this.am=this.patients.length
    // console.log(this.am)

  });
  
  }
 
  edit(){
   
    if ((this.addForm.value.nom=='') || (this.addForm.value.prenom=='') || (this.addForm.value.tel=='') || (this.addForm.value.email=='')  || (this.addForm.value.password=='') ) {
      alert('champs obligatoires');
    } else {
    
  
     
        this.service.editadmin(this.addForm.value).subscribe(
          (data: any) => {
            alert(' editing the Admin.');
            console.log(this.addForm.value)
          
           
            this.addForm.reset();
            this.cdr.detectChanges();
          },
          error => {
            alert('An error occurred while editing the dmin.');
          }
        );
      
    }

      this.service.imageUpload(this.addForm.value.img).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            // Handle upload progress event
            console.log(`Upload progress: ${Math.round(100 * event.loaded / event.total)}%`);
          } else if (event.type === HttpEventType.Response) {
            // Handle upload complete event
            console.log(event.body); // This will log the response data from the API
          }
        })
     }
    
         
     
  }

