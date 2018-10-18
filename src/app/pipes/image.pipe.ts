import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img:string, type:string='users'):any{

    let url = URL_SERVICES + '/img'; 

    if(!img){
        return url + '/users/xxxx';
    }

    if(img.indexOf('https') >= 0){

      return img;
    }

    switch(type){
      case 'users':
        url += '/users/' + img;
      break;
      case 'doctors':
        url += '/doctors/' + img;
        
      break;
      case 'hospitales':
        url += '/hospitales/' + img;
      break;
      default:{
        swal('The type of image does not exist','only png, jpg, jpeg, gif','warning');
        url += '/users/xxxx';
        break;
      }
    }

    return url;
  }

}
