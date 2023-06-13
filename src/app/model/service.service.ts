import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {DayPilot} from "@daypilot/daypilot-lite-angular";
import {Observable, catchError, throwError} from 'rxjs';

import { Med, Patient, User, admin, matriel, recette, register } from './user';
import EventData = DayPilot.EventData;
import EventId = DayPilot.EventId;
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url: string="https://server.oxyboreal.com/api/"
 user:User []=[]
 med:Med []=[]
 patient:Patient []=[]
 Matriels:matriel[]=[]



  constructor( private http : HttpClient,private router:Router  ) { 
    
    
    
  }
    baseUrl: string="https://server.oxyboreal.com/api/"

// <<<<<<< HEAD
//   baseUrl: string="http://boreal.houssem.tn/api/"
// =======
//   baseUrl: string="https://boreal.hossem.tn/api/"
// >>>>>>> a43bb19f5d252d97f5ad8bf5bc734389dda62211
  

   ajouterUser(user:User){
      // this.user.push(user)
      // console.log(this.user)
      return this.http.post(this.baseUrl+'insert.php',user)
    }
    ajouterMed(med:Med){
   
      return this.http.post(this.baseUrl+'insert2.php',med)
    }
    ajouterpatient(patient:Patient){
      // this.user.push(user)
      // console.log(this.user)
      return this.http.post(this.baseUrl+'insert3.php',patient)
    }
    editPatient(patient:Patient){
      // this.user.push(user)
      // console.log(this.user)
      return this.http.put(this.baseUrl+'update.php',patient)
    }
    getUsers(){
      // console.log(this.user)
      return this.http.get<User[]>(this.baseUrl+'view.php');
      
    }
    getMed(){
      // console.log(this.user)
      return this.http.get<Med[]>(this.baseUrl+'view2.php');
      
    }
    getpatient(){
      // console.log(this.user)
      return this.http.get<Patient[]>(this.baseUrl+'view3.php');
      
    }
    getSignlePatient(id:any){
      // console.log(this.user)
      return this.http.get<Patient[]>(this.baseUrl+'view3.php?P_id='+id);
      
    }
  
    ajoutermatriel(Matriels:matriel){
      // this.user.push(user)
      // console.log(this.user)
      return this.http.post(this.baseUrl+'insert4.php',Matriels)
    }
    getmatriel(){
      // console.log(this.user)
      return this.http.get<matriel[]>(this.baseUrl+'view4.php');
      
    }
    DeletePatient(id:any){
      console.log(id)
      return this.http.delete(this.baseUrl+'delete.php?id='+id)
              }
    Deletematriel(id:any){
      console.log(id)
      return this.http.delete(this.baseUrl+'delete2.php?id='+id)
                        }

     editmatriel(Matriels:matriel){
                          // this.user.push(user)
                          // console.log(this.user)
      return this.http.put(this.baseUrl+'update1.php',Matriels)
       }
       getSignlematriel(id:any){
        // console.log(this.user)
        return this.http.get<matriel[]>(this.baseUrl+'view4.php?id='+id);
        
      }
      getSignlerecette(id:any){
        // console.log(this.user)
        return this.http.get<recette[]>(this.baseUrl+'view5.php?id='+id);
        
      }
      ajouterrecette(recettes:recette){
        // this.user.push(user)
        // console.log(this.user)
        return this.http.post(this.baseUrl+'insert5.php',recettes)
      }
      getrecette(){
        // console.log(this.user)
        return this.http.get<recette[]>(this.baseUrl+'view5.php');
        
      }
      Deleterecette(id:any){
        console.log(id)
        return this.http.delete(this.baseUrl+'delete3.php?id='+id)
                          }
      editrecette(recettes:recette){
                            // this.user.push(user)
                            // console.log(this.user)
        return this.http.put(this.baseUrl+'update2.php',recettes)
         }
         ajouterpinterface(patient:Med ){
          // this.user.push(user)
          // console.log(this.user)
          return this.http.put(this.baseUrl+'update4.php',patient)
        }
        getpinterface(){
          // console.log(this.user)
          return this.http.get<Med[]>(this.baseUrl+'view8.php');
          
        }
        getSignlpinterface(id:any){
          // console.log(this.user)
          return this.http.get<Med[]>(this.baseUrl+'view8.php?id='+id);
        }
          
        getdate(){
          // console.log(this.user)
          return this.http.get<CreateEventParams[]>(this.baseUrl+'view6date.php');
          
        }

        getSignladmin(id:any){
          // console.log(this.user)
          return this.http.get<admin[]>(this.baseUrl+'view7.php?id='+id);
          
        }
        getprofil(){
          // console.log(this.user)
          return this.http.get<admin[]>(this.baseUrl+'view7.php');
          
        }

        editadmin(formData: FormData){
          return this.http.put(this.baseUrl+'update3.php', formData);
        }
        
              imageUpload( profileImage:File):Observable<any>{
                var formData:any=new FormData();
                formData.append("fileToUpload",profileImage);
                return this.http.post(this.baseUrl+"AngularImageUpload/imageUpload.php",formData,{

                  reportProgress:true,
                  observe:'events'
                }).pipe(catchError((err:any) =>{

                  alert(err.message);
                  return throwError(err.message)
                }))

              } 
              
              //  describe('ImageUploadService',()=>{


    //  })

    DeletePatient2(id:any){
      console.log(id)
      return this.http.delete(this.baseUrl+'delete4.php?id='+id)
              }

              editeffect(med:Med){
                // this.user.push(user)
                // console.log(this.user)
                return this.http.put(this.baseUrl+'e_accpetation.php',med)
              }

       
  getEvents(start: DayPilot.Date, end: DayPilot.Date): Observable<EventData[]> {
    return this.http.post(this.url+"api/backend_events.php", {start: start, end: end}) as Observable<EventData[]>;
    
  }
      
        createEvent(params: CreateEventParams): Observable<BackendResult> {
          return this.http.post(this.url+"api/backend_create.php", params) as Observable<BackendResult>;
          
        }
      
        deleteEvent(id: EventId): Observable<BackendResult> {
          return this.http.post(this.url+"api/backend_delete.php", {id: id}) as Observable<BackendResult>;
        }
      
        moveEvent(params: MoveEventParams): Observable<BackendResult> {
          return this.http.post(this.url+"api/backend_move.php", params) as Observable<BackendResult>;
        }}
         export interface CreateEventParams {
          id?: string | number;
          start: string;
          end: string;
          text: string;
          barColor:string;
        }
        
        export interface MoveEventParams {
          id: EventId;
          newStart: DayPilot.Date;
          newEnd: DayPilot.Date;
        }
        
        export interface BackendResult {
          id: EventId;
          result: string;
          message: string;
        }
      
      
            
