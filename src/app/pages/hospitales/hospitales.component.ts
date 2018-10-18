import { Component, OnInit } from '@angular/core';
import { HospitalService, ModalUploadService } from '../../services/services.index';
import { Hospital } from '../../app/models/hospital.model';

declare var swal:any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  constructor(public hospitalService:HospitalService,
              public modalUploadService:ModalUploadService) {
                
               }

  hospitales:Hospital[] = [];
  loading: boolean = true;
  totalRecords: number = 0;
  since: number = 0;


  ngOnInit() {
      this.loadHospital();
      this.modalUploadService.emitter.subscribe(()=>{
        this.loadHospital();
      });
  }

  loadHospital(){
    this.hospitalService.loadHospitales()
    .subscribe((res:any)=>{
      this.hospitales = res;
      this.totalRecords = this.hospitalService.totalHospitales;
    });
  }

  getHospitalById(id:string){
    
      this.hospitalService.getHospitalById(id)
      .subscribe((res:any)=>{
          console.log(res);
      });
  }

  createHospital(){

    swal({
      title:'Create Hospital',
      text:'name hospital',
      content:'input',
      icon:'info',
      buttons:true,
      dangerMode:true

    })
    .then((value:string) =>{

      if(!value || value.length === 0){
          return;
      }

      this.hospitalService.createHospital(value).subscribe(()=>{
        this.loadHospital();
      });
    });
  }

  searchHospital(index:string){

    if(index.length <= 0){
      this.loadHospital();
      return;
    }
  
      //this.loading = true;
      this.hospitalService.searchHospital(index).subscribe(hospital=> this.hospitales = hospital)
  }

  viewModal(){

  }

  updateHospital(hospital:Hospital){

    this.hospitalService.updateHospital(hospital).subscribe();
  }

  deleteHospital(hospital:Hospital){

    this.hospitalService.deleteHospital(hospital._id)
    .subscribe(()=>this.loadHospital());
  }

  changeSince(index:number){
    let since = this.since + index;

      if(since >= this.totalRecords){
          return;
      }

      if(since < 0){
        return;
      }

      this.since += index;
      this.loadHospital();
  }

  uploadImg(hospital:Hospital){
    this.modalUploadService.viewModal('hospitales',hospital._id);
  }
  
}
