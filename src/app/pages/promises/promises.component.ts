import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() { 
    this.contar3().then(mess =>console.log('End Promise',mess))
    .catch(error => console.error('Error Promise', error));
  }

  ngOnInit() {
  }
  
  contar3(): Promise<boolean> {
      return new Promise((resolve, reject) =>{
      let counter = 0;
      let itervalo = setInterval(() =>{
        counter +=1;
        if(counter === 3){
          resolve(true);
          //reject('simple mess error');
          clearInterval(itervalo);
        }
      },1000);
    });
  }
}
