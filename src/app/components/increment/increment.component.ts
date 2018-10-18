import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: []
})
export class IncrementComponent implements OnInit {

  @ViewChild('txtprogress') txtprogress: ElementRef;

  @Input()
  progreso: number = 50;
  @Input()
  leyen:String = "";
  @Output()
  changeValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  nivel(index:number){

    if(this.progreso >= 100 && index > 0){
      this.progreso = 100;
        return;
    }

    if(this.progreso <= 0 && index < 100){
      this.progreso = 0;
        return;
    }

  this.progreso = this.progreso + index;
  this.changeValue.emit(this.progreso);
  this.txtprogress.nativeElement.focus();
  }

  onChange(newValue:number){

    //let elemHTML:any = document.getElementsByName('progreso')[0];

    if(newValue >= 100){
      this.progreso = 100;
    }else if(newValue <= 0){
      this.progreso = 0;
    }else{
      this.progreso = newValue;
    }
    //elemHTML.value = Number(this.progreso);
    this.txtprogress.nativeElement.value = this.progreso;
    this.changeValue.emit(this.progreso);
  }

}
