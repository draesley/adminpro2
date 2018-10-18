import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../app/models/medico.model';
import { DoctorService } from '../../services/services.index';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  doctors:Doctor[] = [];
  totalDoctor:number = 0;

  constructor(public doctorService:DoctorService) { }

  ngOnInit() {
    this.uploadDoctor();
  }

  searchDoctor(index:string){

    if(index.length <= 0){
        this.uploadDoctor();
      return;
    }

    this.doctorService.searchDoctor(index)
    .subscribe(doctors =>{
      this.doctors = doctors;
    });
  }

  uploadDoctor(){
    this.doctorService.uploadDoctor().subscribe(doctors =>{
      this.doctors = doctors;
      console.log(doctors._id + 'id de doctor');
      this.totalDoctor = this.doctorService.totalDoctor;

    });
  }

  deleteDoctor(doctor:Doctor){
    this.doctorService.deleteDoctor(doctor._id).subscribe(()=>{
      this.uploadDoctor();
    });
  }
}
