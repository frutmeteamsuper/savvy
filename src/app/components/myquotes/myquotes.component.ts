import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myquotes',
  templateUrl: './myquotes.component.html',
  styleUrls: ['./myquotes.component.css']
})
export class MyquotesComponent implements OnInit {
text="¿Qué tipo de empresa eres?";
steep=0;
  constructor(
    public router:Router
  ) { }

  ngOnInit() {
  }

}
