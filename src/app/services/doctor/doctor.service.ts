import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { Doctor } from '../../app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  totalDoctor:number = 0;
  token:string = '';

  constructor(private http:HttpClient,
              private userService:UserService) { }

  uploadDoctor(){
    
    let url = URL_SERVICES + '/doctor';

    return this.http.get(url)
    .pipe(map((res:any)=>{
        this.totalDoctor = res.conteo;
        return res.doctors;
    }));
  }

  searchDoctor(index:string){

    let url = URL_SERVICES + '/search/collection/doctors/' + index;
    
    return this.http.get(url).pipe(map((resp:any)=> resp.doctors));

  }

  uploadDoctorById(id:string){

      let url = URL_SERVICES + '/doctor/' + id;

      return this.http.get(url)
      .pipe(map((res:any)=>res.doctor));
  }

  createDoctor(doctor:Doctor){

    this.token = this.userService.token;

    let url = URL_SERVICES + '/doctor';
    

    if(doctor._id){
      //si existe actualizar
        url += '/' + doctor._id;
        url += '?token=' + this.token;
        return this.http.put(url, doctor)
        .pipe(map((resp:any) =>{
            swal('Update','Doctor','success');
            return resp.doctor;
        }));
    }else{
        //si no exite guardar
        url += '?token=' + this.token;
        return this.http.post(url,doctor)
        .pipe(map((res:any)=>{
          swal('Create','Doctor','success');
          return res.doctor;
        }));
    }
  }

  deleteDoctor(id:string){
    this.token = this.userService.token;
    let url = URL_SERVICES + '/doctor/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
    .pipe(map(res=>{
        swal('Delete','Doctor','success');
    }))
  }
}
