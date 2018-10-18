import { Component, Input } from "@angular/core";

@Component({
    selector:'app-grafico',
    templateUrl:'./graficoDona.component.html',
})

export class GraficoDonaComponent{
    // Doughnut
  @Input() doughnutChartLabels:string[] = [];
  @Input() doughnutChartData:number[] = [];
  @Input() doughnutChartType:string = '';

  
   // events
   public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}