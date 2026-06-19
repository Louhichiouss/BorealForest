import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {DayPilot} from "@daypilot/daypilot-lite-angular";
import {Observable, catchError, throwError} from 'rxjs';

import { Med, Patient, User, admin, depense, matriel, recette, register } from './user';
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
// <<<<<<< HEAD
//   baseUrl: string="http://boreal.houssem.tn/api/"
// =======
//   baseUrl: string="https://boreal.hossem.tn/api/"
// >>>>>>> a43bb19f5d252d97f5ad8bf5bc734389dda62211
   baseUrl: string="https://server.oxyboreal.com/api/";

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
 getpinterface() {
  return this.http.get<any>(this.baseUrl + 'view.php');
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

       editadmin(data: any) {
  return this.http.put(this.baseUrl + 'update3.php', data);
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
              
              ajouterdepense(depenses:depense){
                // this.user.push(user)
                // console.log(this.user)
                return this.http.post(this.baseUrl+'insert7.php',depenses)
              }
              getdepense(){
                // console.log(this.user)
                return this.http.get<depense[]>(this.baseUrl+'view9.php');
                
              }
              getSignledepense(id:any){
                // console.log(this.user)
                return this.http.get<depense[]>(this.baseUrl+'view9.php?id='+id);
              }
              editdepense(depenses:depense){
                // this.user.push(user)
                // console.log(this.user)
return this.http.put(this.baseUrl+'update5.php',depenses)
}
Deletedepense(id:any){
  console.log(id)
  return this.http.delete(this.baseUrl+'delete5.php?id='+id)
                    }
    DeletePatient2(id:any){
      console.log(id)
      return this.http.delete(this.baseUrl+'delete4.php?id='+id)
              }

              editeffect(med:Med){
                // this.user.push(user)
                // console.log(this.user)
                return this.http.put(this.baseUrl+'e_accpetation.php',med)
              }


searchPatient(q: string) {
  return this.http.get(this.baseUrl + 'searchPatient.php?q=' + encodeURIComponent(q));
}

getFacturePatient() {
  return this.http.get(this.baseUrl + 'viewFacturePatient.php');
}

addFacturePatient(data: any) {
  return this.http.post(this.baseUrl + 'insertFacturePatient.php', data);
}

updateFacturePatient(data: any) {
  return this.http.put(this.baseUrl + 'updateFacturePatient.php', data);
}

deleteFacturePatient(id: any) {
  return this.http.delete(this.baseUrl + 'deleteFacturePatient.php?id=' + id);
}

uploadDepenseFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post(this.baseUrl + 'uploadDepenseFile.php', formData);
}
       
 getEvents(start: DayPilot.Date, end: DayPilot.Date): Observable<EventData[]> {
  return this.http.post(this.url + "api/backend_events.php", { start: start, end: end }) as Observable<EventData[]>;
}

createEvent(params: CreateEventParams): Observable<BackendResult> {
  return this.http.post(this.url + "api/backend_create.php", params) as Observable<BackendResult>;
}

updateEvent(params: any): Observable<BackendResult> {
  return this.http.post(this.url + "api/backend_update.php", params) as Observable<BackendResult>;
}

deleteEvent(id: EventId): Observable<BackendResult> {
  return this.http.post(this.url + "api/backend_delete.php", { id: id }) as Observable<BackendResult>;
}

moveEvent(params: MoveEventParams): Observable<BackendResult> {
  return this.http.post(this.url + "api/backend_move.php", params) as Observable<BackendResult>;
}







getMarketingCampaigns() {
  return this.http.get(this.baseUrl + 'viewMarketingCampaigns.php');
}

addMarketingCampaign(data: any) {
  return this.http.post(this.baseUrl + 'insertMarketingCampaign.php', data);
}

updateMarketingCampaign(data: any) {
  return this.http.post(this.baseUrl + 'updateMarketingCampaign.php', data);
}

deleteMarketingCampaign(id: any) {
  return this.http.delete(this.baseUrl + 'deleteMarketingCampaign.php?id=' + id);
}

getMarketingReminders() {
  return this.http.get(this.baseUrl + 'viewMarketingReminders.php');
}
getMarketingSocial() {
  return this.http.get(this.baseUrl + 'viewMarketingSocial.php');
}
getMarketingEvents() {
  return this.http.get(this.baseUrl + 'viewMarketingEvents.php');
}

addMarketingEvent(data: any) {
  return this.http.post(this.baseUrl + 'insertMarketingEvent.php', data);
}

updateMarketingEvent(data: any) {
  return this.http.post(this.baseUrl + 'updateMarketingEvent.php', data);
}

deleteMarketingEvent(id: any) {
  return this.http.delete(this.baseUrl + 'deleteMarketingEvent.php?id=' + id);
}

sendMarketingSms(data: any) {
  return this.http.post(this.baseUrl + 'sendMarketingSms.php', data);
}
// service.service.ts
// getFacebookStats() {
//   return this.http.get(this.baseUrl + 'viewFacebookStats.php');
// }
// getFacebookAdsStats() {
//   return this.http.get(this.baseUrl + 'viewFacebookAdsStats.php');
// }
// getInstagramStats() {
//   return this.http.get<any>('https://server.oxyboreal.com/api/viewInstagramStats.php');
// }

// getInstagramHistory(period: string) {
//   return this.http.get<any>(
//     `https://server.oxyboreal.com/api/viewInstagramHistory.php?period=${period}`
//   );
// }



logoUpload(file: File) {
  const formData = new FormData();
  formData.append('logo', file);

  return this.http.post(
    this.baseUrl + 'uploadLogo.php',
    formData,
    {
      reportProgress: true,
      observe: 'events'
    }
  );
}
deleteLogo() {
  return this.http.post(this.baseUrl + 'deleteLogo.php', {});
}

adminPhotoUpload(file: File) {
  const formData = new FormData();
  formData.append('photo', file);

  return this.http.post(this.baseUrl + 'uploadAdminPhoto.php', formData, {
    reportProgress: true,
    observe: 'events'
  });
}

getAdminDashboard() {
  return this.http.get<any>(this.url + 'adminDashboard.php');
}



payMarketingReminder(id: any) {
  return this.http.post<any>(this.url + 'payMarketingReminder.php', { id });
}






}
       export interface CreateEventParams {
  id?: string | number;
  start: string;
  end: string;
  text: string;
  barColor: string;
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
      
      
      
