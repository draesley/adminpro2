import { Component, OnInit } from '@angular/core';
import { UploadFileService, ModalUploadService } from '../../services/services.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

uploadFile:File;
temporaryImage:string;

  constructor(public uploadFileService:UploadFileService,
              public modalUploadService:ModalUploadService) { }

  ngOnInit() {
  }


  selectImage(file:File){

    if(!file){
      this.uploadFile = null;
      return;
    };

    if(file.type.indexOf('image') < 0){
        swal('!!!','only Image','warning');
        this.uploadFile = null;
        return;
    };

    this.uploadFile = file
  
    //js puro
    let fileReader = new FileReader();

    let imgtemp = fileReader.readAsDataURL(file);

    fileReader.onloadend = ()=> this.temporaryImage = fileReader.result; };

uploadImage(){
  this.uploadFileService.uploadFile(this.uploadFile,this.modalUploadService.type,this.modalUploadService.id)
  .then(res =>{
      this.modalUploadService.emitter.emit(res);
      this.closeModal();
  })
  .catch(err=>{
    swal('errorr upload','not upload image','warning');
  });
}

closeModal(){
  this.uploadFile = null;
  this.temporaryImage = null;
  this.modalUploadService.hiddenModal();
}

}
