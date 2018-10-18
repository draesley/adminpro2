import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { 
    
    this.subscription = this.returnObservable()
    .subscribe(
      number => console.log('observable', number),
      error => console.error('this is error', error),
      () => console.log('este es el log')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(){
      this.subscription.unsubscribe();
  }

  returnObservable():Observable<any>{
      return new Observable((observer: Subscriber<any>) =>{
      let counter = 0;
      
      let intervalo = setInterval(()=>{
        counter +=1;

        const exit = {
          value:counter,
        };

        let salida = {
          valor: counter
        }

        observer.next(exit);
        /* if(counter === 3){
            clearInterval(itervalo);
            observer.complete();
        }; */

        /* if(counter === 2){
          //clearInterval(itervalo);
          observer.error('Auxilio');
        } */
      },500);
      }).pipe(
        retry(2),
        map(resp => resp.value),
        filter((value,index)=> {
          if((value % 2) == 1){
            return true;
          }else{
            return false;
          }
          
        })
    );
  }

}
