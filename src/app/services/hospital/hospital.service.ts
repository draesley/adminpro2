import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../app/models/hospital.model';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token:string = '';
  totalHospitales:number = 0;

  constructor(private http:HttpClient,
              private userService:UserService) { }

  loadHospitales(){
    let url = URL_SERVICES + '/hospital';
    return this.http.get(url)
    .pipe(map((res:any) =>{
      this.totalHospitales = res.conteo;
      return res.hospitales}));
  }

  getHospitalById(id:string){
    let url = URL_SERVICES + '/hospital/' + id;
    return this.http.get(url)
    .pipe(map((res:any)=>res.hospital));
  }

  createHospital(name:string){
      
      
      this.token = this.userService.token;
      let id = this.userService.user._id;

      let url = URL_SERVICES + '/hospital/';
      url += '?token=' + this.token;

      return this.http.post(url, {name})
      .pipe(map((res:any)=>{
        swal('Create','Hospital ok','success');
        return res.hospital
      }));
  }

  updateHospital(hospital:Hospital){

    this.token = this.userService.token;
    let url = URL_SERVICES + '/hospital/' + hospital._id;
    url += '?token=' + this.token;

    return this.http.put(url,hospital)
    .pipe(map((res:any)=>{
      swal('Update','Hospital ok','success');
      return res.hospital;
    }
  ));
  }

  deleteHospital(id:string){
    
    this.token = this.userService.token;
    let url = URL_SERVICES + '/hospital/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
    .pipe(map(()=> swal('Delete','Hospital delete','success')));
  }

  searchHospital(index:string){

    let url = URL_SERVICES + '/search/collection/hospitales/' + index;
    return this.http.get(url).pipe(map((res:any)=> res.hospitales));
    
  }
}
