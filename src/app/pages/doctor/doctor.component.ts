import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HospitalService, DoctorService } from '../../services/services.index';
import { Hospital } from '../../app/models/hospital.model';
import { Doctor } from '../../app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  hospitales:Hospital[];
  doctor: Doctor = new Doctor('','','','','');
  hospitalImg:Hospital = new Hospital('');
  doctors:Doctor[] = [];

  constructor(public hospitalService:HospitalService,
              public doctorService:DoctorService,
              public router:Router,
              public activatedRoute:ActivatedRoute,
              public modalUploadService:ModalUploadService) {

              activatedRoute.params.subscribe(params =>{

    let id = params['id'];
    console.log(id + 'este es el id')

    if(id !== 'nuevo'){
        this.loadDoctor(id);
    }
  });
               }

  ngOnInit() {

    this.loadHospitales();

    this.modalUploadService.emitter.subscribe(resp =>{
      this.doctor.img = resp.doctor.img;
      console.log(resp + 'este es el doctor');
    });
  }

  saveDoctor(f:NgForm){

    if(f.invalid){
        return;
    }

    this.doctorService.createDoctor(this.doctor).subscribe(doctor =>{
      console.log(doctor._id + 'id del medico en conflito');
        this.doctor._id = doctor._id;
        this.router.navigate(['/doctor', doctor._id]);
    });
   
  }

  loadHospitales(){
    this.hospitalService.loadHospitales().subscribe(hospitales=> this.hospitales = hospitales)
  }

  changeHospital(id:string){

    console.log(id + 'este es el id');

    this.hospitalService.getHospitalById(id)
    .subscribe(hospital => this.hospitalImg = hospital)
     
  }

  loadDoctor(id:string){

    this.doctorService.uploadDoctorById(id).subscribe(doctor => {

      console.log(doctor + 'este es el id del doctyor de res');
      this.doctor = doctor;
      this.doctor.hospital = doctor.hospital._id;

      console.log(this.doctor.hospital + 'este es el id del hospital'); 
      this.changeHospital(this.doctor.hospital);
    });

  }

  changeImgDoctor(){
      this.modalUploadService.viewModal('doctors',this.doctor._id);
  }

}
