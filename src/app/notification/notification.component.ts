import { ChangeDetectorRef, Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../model/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Med, register } from '../model/user';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  patients :Med[]=[];
  am:any
  addForm:FormGroup
  pinterface_id: any;
patient:any
selectedAction: any;
selectedAction1: Med[]=[];

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
      action:['',Validators.required],
    })
  }

 
 

  ngOnInit(): void {
    this.appcomponent.hideHeaderAndFooter = true;

    
       
    // this.pinterface_id=13;


    // if (this.pinterface_id > 0){
    //   this.service.getSignlpinterface(this.pinterface_id).subscribe((data:any)=>{
    //     this.addForm.patchValue(data.data)

    //     this.patients=data.data
    //     this.patient=this.patients
    //   });
    // }
    //   console.log(this.addForm.value.id)




    this.service.getpinterface().subscribe((result: any) => {
      this.patients = result.data;
       console.log(this.patients);
      //  for (let i = 0; i < this.patients.length; i++) {
      //   const idFormControl = this.addForm.controls['id'];
      //   idFormControl.setValue(this.patients[i].id);
 
      //   }
      
    });

    this.am = [];
    
    }
    DeletePatient2( intr:any){
      const confirmation = window.confirm("Voulez-vous vraiment supprimer ce patient ?");
      if (confirmation) {
      // console.log(id)
      this.service. DeletePatient2(intr.id).subscribe(data=>{
  
  
        this.patients=this.patients.filter((u: any)=> u!==intr);
  
  
      })
  
  
    }}
    effect(intr: Med){
      if(!this.selectedAction){
        alert('Choisissez une option');
        return;
      }
    
      const data: any = {
        id: intr.id,
        action: this.selectedAction,
      };
      
      this.service.editeffect(data).subscribe(
        (response: any) => {
          alert('Action ajoutée.');
          console.log(data);
            
          this.addForm.reset();
          this.cdr.detectChanges();
        },
        error => {
          alert('Une erreur est survenue lors de l\'ajout de l\'action.');
        }
      );
    }
    
    
      }
      
  

