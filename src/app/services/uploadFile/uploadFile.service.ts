import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile(file:File, type:string, id:string){


    return new Promise((resolve,reject)=>{
      // js puro
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      //image la palabra que es el nombre del campo de la imagen donde se envia la img
      formData.append('image',file,file.name);
  
      //notifica cambios
      xhr.onreadystatechange = function(){
          if(xhr.readyState === 4){
            if(xhr.status === 200){
                swal('File update','ok','success');
                resolve(JSON.parse(xhr.response));
            }else{
                swal('File Not update','Hussss!!!','warning');
                reject(xhr.response);
            }
          }
      }

      let url = URL_SERVICES + '/upload/' + type + '/' + id;
      xhr.open('PUT', url, true)
      xhr.send(formData);
    });
  };
}
