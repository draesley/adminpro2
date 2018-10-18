import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public type:string;
  public id:string;
  public hidden:string = 'hidden';
  public emitter = new  EventEmitter<any>();

  constructor() { }

  hiddenModal(){
    this.hidden = 'hidden';
    this.type = null;
    this.id= null;
  }

  viewModal(type:string, id:string){

    this.type = type;
    this.id=id;
    this.hidden = '';
  }

}
