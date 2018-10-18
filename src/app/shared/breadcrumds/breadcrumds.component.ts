import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumds',
  templateUrl: './breadcrumds.component.html',
  styles: []
})
export class BreadcrumdsComponent implements OnInit {

  titles:string;

  constructor(private router:Router,
              private title:Title,
              private meta:Meta) { 
    this.getDataRoute().subscribe(data =>{
      this.titles = data.title;
      this.title.setTitle(this.titles);
      const metaTag:MetaDefinition ={
        name:'description',
        content:this.titles
      };

      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }

  getDataRoute(){
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event:ActivationEnd)=> event.snapshot.firstChild === null),
      map((event:ActivationEnd)=> event.snapshot.data)
    )
  };

}
